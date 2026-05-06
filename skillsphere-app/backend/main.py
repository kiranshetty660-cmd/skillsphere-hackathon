"""
FastAPI WebSocket server for real-time interview behaviour analysis.

Run with:
    cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8765
"""

from __future__ import annotations

import asyncio
import base64
import json
import time
from contextlib import asynccontextmanager

import cv2
import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from dataclasses import asdict

from analyser import BehaviourAnalyser, BehaviourSnapshot

# ──────────────────────────────────────────────────────────────────────────────
# App setup
# ──────────────────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(title="SkillSphere Behaviour Analysis", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────────────────────

def decode_frame(base64_data: str) -> np.ndarray | None:
    """Decode a base64-encoded JPEG/PNG frame to a BGR numpy array."""
    try:
        # Strip data URL prefix if present
        if "," in base64_data:
            base64_data = base64_data.split(",", 1)[1]
        img_bytes = base64.b64decode(base64_data)
        arr = np.frombuffer(img_bytes, dtype=np.uint8)
        frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        return frame
    except Exception:
        return None


# ──────────────────────────────────────────────────────────────────────────────
# WebSocket endpoint
# ──────────────────────────────────────────────────────────────────────────────

@app.websocket("/ws/analyse")
async def websocket_analyse(ws: WebSocket):
    await ws.accept()

    analyser = BehaviourAnalyser()
    last_send_time = 0.0
    SEND_INTERVAL = 2.0  # aggregate and send every 2 seconds

    try:
        while True:
            raw = await ws.receive_text()
            msg = json.loads(raw)

            msg_type = msg.get("type", "frame")

            if msg_type == "stop":
                # Generate end-of-session report
                report = analyser.generate_report()
                await ws.send_text(json.dumps({"type": "report", "data": report}))
                break

            if msg_type == "frame":
                frame_data = msg.get("frame", "")
                frame = decode_frame(frame_data)
                if frame is None:
                    continue

                # Run ML pipeline (blocking but fast — ~50-150ms with MediaPipe)
                snapshot = await asyncio.to_thread(analyser.analyse_frame, frame)
                if snapshot is None:
                    # No face detected – send a status message
                    now = time.time()
                    if now - last_send_time > SEND_INTERVAL:
                        await ws.send_text(json.dumps({
                            "type": "no_face",
                            "message": "No face detected in frame",
                        }))
                        last_send_time = now
                    continue

                # Throttle sends to every SEND_INTERVAL seconds
                now = time.time()
                if now - last_send_time >= SEND_INTERVAL:
                    await ws.send_text(json.dumps({
                        "type": "snapshot",
                        "data": asdict(snapshot),
                    }))
                    last_send_time = now

    except WebSocketDisconnect:
        pass
    except Exception as e:
        try:
            await ws.send_text(json.dumps({"type": "error", "message": str(e)}))
        except Exception:
            pass
    finally:
        analyser.close()


# ──────────────────────────────────────────────────────────────────────────────
# Health check
# ──────────────────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok", "service": "behaviour-analysis"}
