'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

// ── Types ───────────────────────────────────────────────────────────────────

export interface BehaviourSnapshot {
  timestamp: number
  emotion: string
  emotion_score: number
  eye_contact_pct: number
  blink_rate: number
  posture: string
  shoulder_symmetry: number
  head_tilt_deg: number
  forward_lean: number
  body_openness: string
  micro_expression: string
  head_movement: string
  overall_behaviour_score: number
}

export interface SessionReport {
  duration_seconds: number
  total_snapshots: number
  averages: Record<string, number>
  strengths: Array<{ metric: string; score: number }>
  improvements: Array<{ metric: string; score: number }>
  coaching: string[]
  timeline: Array<{ t: number; emotion: string; score: number }>
}

interface UseBehaviourAnalysisReturn {
  /** Current live snapshot (updates every ~2s while active). */
  snapshot: BehaviourSnapshot | null
  /** Full rolling history of snapshots for charts. */
  history: BehaviourSnapshot[]
  /** Session report generated on stop. */
  report: SessionReport | null
  /** Whether the WebSocket is connected and streaming. */
  isAnalysing: boolean
  /** Whether no face was detected in the latest frame. */
  noFace: boolean
  /** Error message if the WS fails. */
  error: string | null
  /** Start the analysis loop. Provide a function that returns a base64 frame. */
  startAnalysis: (captureFrame: () => string | null) => void
  /** Stop the analysis loop and request a report. */
  stopAnalysis: () => void
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useBehaviourAnalysis(
  wsUrl: string = 'ws://localhost:8765/ws/analyse'
): UseBehaviourAnalysisReturn {
  const wsRef = useRef<WebSocket | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const captureRef = useRef<(() => string | null) | null>(null)

  const [snapshot, setSnapshot] = useState<BehaviourSnapshot | null>(null)
  const [history, setHistory] = useState<BehaviourSnapshot[]>([])
  const [report, setReport] = useState<SessionReport | null>(null)
  const [isAnalysing, setIsAnalysing] = useState(false)
  const [noFace, setNoFace] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle incoming WS messages
  const handleMessage = useCallback((ev: MessageEvent) => {
    try {
      const msg = JSON.parse(ev.data)

      if (msg.type === 'snapshot') {
        const snap = msg.data as BehaviourSnapshot
        setSnapshot(snap)
        setHistory((prev) => [...prev, snap])
        setNoFace(false)
      } else if (msg.type === 'report') {
        setReport(msg.data as SessionReport)
        setIsAnalysing(false)
      } else if (msg.type === 'no_face') {
        setNoFace(true)
      } else if (msg.type === 'error') {
        setError(msg.message)
      }
    } catch {
      // Ignore malformed messages
    }
  }, [])

  const startAnalysis = useCallback(
    (captureFrame: () => string | null) => {
      setError(null)
      setReport(null)
      setHistory([])
      setSnapshot(null)
      setNoFace(false)
      captureRef.current = captureFrame

      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        setIsAnalysing(true)
        // Send frames every 500ms (2 FPS)
        intervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN && captureRef.current) {
            const frame = captureRef.current()
            if (frame) {
              ws.send(JSON.stringify({ type: 'frame', frame }))
            }
          }
        }, 500)
      }

      ws.onmessage = handleMessage

      ws.onerror = () => {
        setError('WebSocket connection failed. Is the Python backend running on port 8765?')
        setIsAnalysing(false)
      }

      ws.onclose = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsAnalysing(false)
      }
    },
    [wsUrl, handleMessage]
  )

  const stopAnalysis = useCallback(() => {
    // Clear frame sending interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Request session report then close
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'stop' }))
      // Give server time to send report before closing
      setTimeout(() => {
        wsRef.current?.close()
        wsRef.current = null
      }, 2000)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [])

  return {
    snapshot,
    history,
    report,
    isAnalysing,
    noFace,
    error,
    startAnalysis,
    stopAnalysis,
  }
}
