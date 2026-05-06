"""
BehaviourAnalyser — modular ML pipeline for real-time interview behaviour analysis.

Uses MediaPipe Face Mesh (478 landmarks + iris) and Pose (33 landmarks) exclusively
so there is no dependency on dlib shape-predictor files.
"""

from __future__ import annotations

import math
import time
from collections import deque
from dataclasses import dataclass, field, asdict
from typing import Optional

import cv2
import numpy as np
import mediapipe as mp

# ──────────────────────────────────────────────────────────────────────────────
# Data classes
# ──────────────────────────────────────────────────────────────────────────────

@dataclass
class BehaviourSnapshot:
    timestamp: float = 0.0
    emotion: str = "neutral"
    emotion_score: int = 50
    eye_contact_pct: int = 0
    blink_rate: int = 0
    posture: str = "unknown"
    shoulder_symmetry: float = 0.0
    head_tilt_deg: float = 0.0
    forward_lean: float = 0.0
    body_openness: str = "unknown"
    micro_expression: str = "neutral"
    head_movement: str = "still"
    overall_behaviour_score: int = 50


@dataclass
class SessionAccumulator:
    """Rolling window accumulators for per-session stats."""
    snapshots: list = field(default_factory=list)
    blink_timestamps: deque = field(default_factory=lambda: deque(maxlen=200))
    eye_contact_history: deque = field(default_factory=lambda: deque(maxlen=60))
    head_positions: deque = field(default_factory=lambda: deque(maxlen=30))
    prev_ear: float = 0.3          # previous eye aspect ratio (for blink detection)
    blink_counter: int = 0
    session_start: float = field(default_factory=time.time)


# ──────────────────────────────────────────────────────────────────────────────
# Landmark index helpers  (MediaPipe Face Mesh 478-point topology)
# ──────────────────────────────────────────────────────────────────────────────

# Eye landmarks for EAR (Eye Aspect Ratio) blink detection
LEFT_EYE  = [362, 385, 387, 263, 373, 380]
RIGHT_EYE = [33,  160, 158, 133, 153, 144]

# Iris landmarks (indices 468-477)
LEFT_IRIS  = [474, 475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]

# Eyebrow landmarks for brow furrowing
LEFT_BROW  = [282, 295, 300]
RIGHT_BROW = [52,  65,  70]

# Lip landmarks for lip compression
UPPER_LIP = [13]
LOWER_LIP = [14]
LEFT_LIP   = [61]
RIGHT_LIP  = [291]

# Nose tip for head pose
NOSE_TIP = 1
CHIN     = 152
LEFT_EAR_POINT  = 234
RIGHT_EAR_POINT = 454
LEFT_EYE_OUTER  = 33
RIGHT_EYE_OUTER = 263


# ──────────────────────────────────────────────────────────────────────────────
# Helper math
# ──────────────────────────────────────────────────────────────────────────────

def _dist(a, b):
    return math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2)


def _eye_aspect_ratio(landmarks, indices):
    """Compute EAR for one eye."""
    p1 = landmarks[indices[0]]
    p2 = landmarks[indices[1]]
    p3 = landmarks[indices[2]]
    p4 = landmarks[indices[3]]
    p5 = landmarks[indices[4]]
    p6 = landmarks[indices[5]]
    vert1 = _dist(p2, p6)
    vert2 = _dist(p3, p5)
    horiz = _dist(p1, p4)
    return (vert1 + vert2) / (2.0 * horiz + 1e-6)


# ──────────────────────────────────────────────────────────────────────────────
# Sub-analysers
# ──────────────────────────────────────────────────────────────────────────────

class FaceAnalyser:
    """Emotion approximation from facial landmark geometry (no neural net)."""

    @staticmethod
    def analyse(landmarks) -> tuple[str, int, str]:
        """Return (emotion, confidence_score, micro_expression)."""
        # Mouth openness
        upper = landmarks[UPPER_LIP[0]]
        lower = landmarks[LOWER_LIP[0]]
        left  = landmarks[LEFT_LIP[0]]
        right = landmarks[RIGHT_LIP[0]]

        mouth_open = _dist(upper, lower) / (_dist(left, right) + 1e-6)
        # Brow distance to eye (furrowing)
        lb = landmarks[LEFT_BROW[1]]
        rb = landmarks[RIGHT_BROW[1]]
        le = landmarks[LEFT_EYE[0]]
        re = landmarks[RIGHT_EYE[0]]
        brow_dist = (_dist(lb, le) + _dist(rb, re)) / 2

        # Simple rule-based emotion classifier
        if mouth_open > 0.45:
            emotion, score = "happy", min(95, int(mouth_open * 150))
        elif brow_dist < 0.035:
            emotion, score = "nervous", min(85, int((0.05 - brow_dist) * 1500))
        elif mouth_open < 0.08:
            emotion, score = "confident", 75
        else:
            emotion, score = "neutral", 60

        # Micro expressions
        if brow_dist < 0.03:
            micro = "stress signal"
        elif mouth_open < 0.05:
            micro = "confidence signal"
        else:
            micro = "neutral"

        return emotion, max(10, min(score, 100)), micro


class EyeAnalyser:
    """Gaze direction and blink tracking using iris + eye landmarks."""

    EAR_BLINK_THRESHOLD = 0.21

    @staticmethod
    def gaze_direction(landmarks) -> str:
        """Estimate where the user is looking."""
        # Iris centre relative to eye corners
        left_iris_cx  = np.mean([landmarks[i].x for i in LEFT_IRIS])
        left_eye_left  = landmarks[LEFT_EYE[0]].x
        left_eye_right = landmarks[LEFT_EYE[3]].x
        ratio = (left_iris_cx - left_eye_left) / (left_eye_right - left_eye_left + 1e-6)

        # Vertical check
        left_iris_cy = np.mean([landmarks[i].y for i in LEFT_IRIS])
        left_eye_top = landmarks[LEFT_EYE[1]].y
        left_eye_bot = landmarks[LEFT_EYE[5]].y
        v_ratio = (left_iris_cy - left_eye_top) / (left_eye_bot - left_eye_top + 1e-6)

        if v_ratio > 0.7:
            return "looking down"
        if ratio < 0.35 or ratio > 0.65:
            return "looking away"
        return "looking at camera"

    @staticmethod
    def detect_blink(landmarks, session: SessionAccumulator) -> bool:
        ear_l = _eye_aspect_ratio(landmarks, LEFT_EYE)
        ear_r = _eye_aspect_ratio(landmarks, RIGHT_EYE)
        ear = (ear_l + ear_r) / 2.0
        blinked = False
        if session.prev_ear > EyeAnalyser.EAR_BLINK_THRESHOLD and ear < EyeAnalyser.EAR_BLINK_THRESHOLD:
            blinked = True
            session.blink_counter += 1
            session.blink_timestamps.append(time.time())
        session.prev_ear = ear
        return blinked

    @staticmethod
    def blink_rate_per_min(session: SessionAccumulator) -> int:
        now = time.time()
        recent = [t for t in session.blink_timestamps if now - t < 60]
        return len(recent)


class PostureAnalyser:
    """Shoulder symmetry, head tilt, forward lean, body openness via MediaPipe Pose."""

    @staticmethod
    def analyse(pose_landmarks) -> dict:
        if pose_landmarks is None:
            return {
                "posture": "unknown",
                "shoulder_symmetry": 0.0,
                "head_tilt_deg": 0.0,
                "forward_lean": 0.0,
                "body_openness": "unknown",
            }

        lm = pose_landmarks.landmark

        # Shoulder symmetry
        l_shoulder = lm[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value]
        r_shoulder = lm[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value]
        shoulder_diff = abs(l_shoulder.y - r_shoulder.y)
        symmetry = max(0.0, 1.0 - shoulder_diff * 10)

        # Head tilt (via nose and midpoint of shoulders)
        nose = lm[mp.solutions.pose.PoseLandmark.NOSE.value]
        mid_shoulder_x = (l_shoulder.x + r_shoulder.x) / 2
        head_tilt = math.degrees(math.atan2(nose.x - mid_shoulder_x, 1.0))

        # Forward lean (z-depth comparison nose vs shoulders)
        nose_z = nose.z
        shoulder_z = (l_shoulder.z + r_shoulder.z) / 2
        forward_lean = max(0.0, min(1.0, (shoulder_z - nose_z) * 5 + 0.5))

        # Body openness (wrist spread relative to shoulders)
        try:
            l_wrist = lm[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value]
            r_wrist = lm[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value]
            wrist_spread = abs(l_wrist.x - r_wrist.x)
            shoulder_spread = abs(l_shoulder.x - r_shoulder.x)
            openness = "open" if wrist_spread > shoulder_spread * 0.8 else "closed"
        except Exception:
            openness = "unknown"

        # Overall posture label
        if symmetry > 0.85 and abs(head_tilt) < 8:
            posture = "upright"
        elif symmetry < 0.6:
            posture = "slouching"
        else:
            posture = "leaning"

        return {
            "posture": posture,
            "shoulder_symmetry": round(symmetry, 2),
            "head_tilt_deg": round(abs(head_tilt), 1),
            "forward_lean": round(forward_lean, 2),
            "body_openness": openness,
        }


class HeadMovementAnalyser:
    """Tracks nose tip position over time to detect nodding / shaking / stillness."""

    @staticmethod
    def analyse(landmarks, session: SessionAccumulator) -> str:
        nose = landmarks[NOSE_TIP]
        session.head_positions.append((nose.x, nose.y, time.time()))

        if len(session.head_positions) < 10:
            return "still"

        xs = [p[0] for p in session.head_positions]
        ys = [p[1] for p in session.head_positions]

        x_var = np.var(xs)
        y_var = np.var(ys)

        if y_var > 0.0008:
            return "nodding"
        if x_var > 0.0008:
            return "shaking"
        return "still"


# ──────────────────────────────────────────────────────────────────────────────
# Main orchestrator
# ──────────────────────────────────────────────────────────────────────────────

class BehaviourAnalyser:
    """Runs the full ML pipeline on a single video frame."""

    def __init__(self):
        self.face_mesh = mp.solutions.face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,   # enables iris landmarks
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
        )
        self.pose = mp.solutions.pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
        )
        self.session = SessionAccumulator()

    def reset_session(self):
        self.session = SessionAccumulator()

    def analyse_frame(self, frame: np.ndarray) -> Optional[BehaviourSnapshot]:
        """Process a BGR frame and return a BehaviourSnapshot, or None if no face."""
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Face mesh
        face_result = self.face_mesh.process(rgb)
        if not face_result.multi_face_landmarks:
            return None
        face_lms = face_result.multi_face_landmarks[0].landmark

        # Pose
        pose_result = self.pose.process(rgb)
        pose_lms = pose_result.pose_landmarks if pose_result.pose_landmarks else None

        elapsed = time.time() - self.session.session_start

        # --- Sub-analyses ---
        emotion, emotion_score, micro = FaceAnalyser.analyse(face_lms)
        gaze = EyeAnalyser.gaze_direction(face_lms)
        EyeAnalyser.detect_blink(face_lms, self.session)
        blink_rate = EyeAnalyser.blink_rate_per_min(self.session)

        # Eye contact rolling percentage
        self.session.eye_contact_history.append(1 if gaze == "looking at camera" else 0)
        eye_contact_pct = int(
            (sum(self.session.eye_contact_history) / len(self.session.eye_contact_history)) * 100
        ) if self.session.eye_contact_history else 0

        posture_data = PostureAnalyser.analyse(pose_lms)
        head_movement = HeadMovementAnalyser.analyse(face_lms, self.session)

        # --- Overall score ---
        score = int(
            emotion_score * 0.25
            + eye_contact_pct * 0.25
            + posture_data["shoulder_symmetry"] * 100 * 0.2
            + (100 - min(abs(posture_data["head_tilt_deg"]) * 3, 100)) * 0.15
            + (100 if head_movement == "still" else 50) * 0.15
        )

        snapshot = BehaviourSnapshot(
            timestamp=round(elapsed, 1),
            emotion=emotion,
            emotion_score=emotion_score,
            eye_contact_pct=eye_contact_pct,
            blink_rate=blink_rate,
            posture=posture_data["posture"],
            shoulder_symmetry=posture_data["shoulder_symmetry"],
            head_tilt_deg=posture_data["head_tilt_deg"],
            forward_lean=posture_data["forward_lean"],
            body_openness=posture_data["body_openness"],
            micro_expression=micro,
            head_movement=head_movement,
            overall_behaviour_score=max(0, min(100, score)),
        )
        self.session.snapshots.append(snapshot)
        return snapshot

    def generate_report(self) -> dict:
        """Generate end-of-session summary report."""
        snaps = self.session.snapshots
        if not snaps:
            return {"error": "No data collected"}

        n = len(snaps)
        avg = lambda attr: round(sum(getattr(s, attr) for s in snaps) / n, 1)

        metrics = {
            "eye_contact": avg("eye_contact_pct"),
            "emotion_score": avg("emotion_score"),
            "shoulder_symmetry": avg("shoulder_symmetry") * 100,
            "posture_score": sum(1 for s in snaps if s.posture == "upright") / n * 100,
            "head_stability": sum(1 for s in snaps if s.head_movement == "still") / n * 100,
            "overall": avg("overall_behaviour_score"),
        }

        # Strengths and improvements
        ranked = sorted(metrics.items(), key=lambda x: x[1], reverse=True)
        strengths = [{"metric": k, "score": round(v, 1)} for k, v in ranked[:3]]
        improvements = [{"metric": k, "score": round(v, 1)} for k, v in ranked[-3:]]

        # Coaching tips
        coaching = []
        if metrics["eye_contact"] < 70:
            coaching.append("Practice looking directly at the camera lens instead of the screen.")
        if metrics["shoulder_symmetry"] < 80:
            coaching.append("Sit up straight with both shoulders level. Consider adjusting your chair height.")
        if metrics["head_stability"] < 70:
            coaching.append("Minimize excessive head movement. Keep your head still and use verbal affirmations instead of nodding.")
        if metrics["emotion_score"] < 60:
            coaching.append("Practice power posing before interviews to boost natural confidence signals.")
        if not coaching:
            coaching.append("Great job! Maintain your current performance and focus on consistency.")

        # Emotion timeline
        timeline = [
            {"t": s.timestamp, "emotion": s.emotion, "score": s.emotion_score}
            for s in snaps
        ]

        return {
            "duration_seconds": round(snaps[-1].timestamp, 1),
            "total_snapshots": n,
            "averages": metrics,
            "strengths": strengths,
            "improvements": improvements,
            "coaching": coaching,
            "timeline": timeline,
        }

    def close(self):
        self.face_mesh.close()
        self.pose.close()
