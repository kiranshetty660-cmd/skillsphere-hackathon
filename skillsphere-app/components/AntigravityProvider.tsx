'use client'

/**
 * AntigravityProvider.tsx
 *
 * Dual-purpose context provider:
 * 1. Original "Antigravity" toggle for milestone celebrations (floating UI)
 * 2. Behaviour Analysis orchestration — manages webcam + WS analysis lifecycle
 *    for the Pitch Byte Communication Lab.
 *
 * Wrap your dashboard layout with <AntigravityProvider> to access both features.
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { useWebcam } from '@/hooks/useWebcam'
import { useBehaviourAnalysis } from '@/hooks/useBehaviourAnalysis'
import type { BehaviourSnapshot, SessionReport } from '@/hooks/useBehaviourAnalysis'

// ── Context shape ───────────────────────────────────────────────────────────

interface AntigravityContextProps {
  // Antigravity (milestone celebrations)
  antigravityEnabled: boolean
  toggleAntigravity: (enabled: boolean) => void

  // Webcam
  videoRef: React.RefObject<HTMLVideoElement | null>
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  isCameraOn: boolean
  cameraError: string | null
  startCamera: () => Promise<void>
  stopCamera: () => void

  // Behaviour analysis
  snapshot: BehaviourSnapshot | null
  history: BehaviourSnapshot[]
  report: SessionReport | null
  isAnalysing: boolean
  noFace: boolean
  analysisError: string | null
  startInterview: () => Promise<void>
  stopInterview: () => void
  dismissReport: () => void
}

const AntigravityContext = createContext<AntigravityContextProps | undefined>(undefined)

// ── Provider ────────────────────────────────────────────────────────────────

interface ProviderProps {
  children: ReactNode
  /** WebSocket URL for the Python behaviour analysis server. */
  wsUrl?: string
}

export const AntigravityProvider = ({
  children,
  wsUrl = 'ws://localhost:8765/ws/analyse',
}: ProviderProps) => {
  // Antigravity toggle
  const [antigravityEnabled, setAntigravityEnabled] = useState(false)
  const toggleAntigravity = useCallback((value: boolean) => setAntigravityEnabled(value), [])

  // Webcam hook
  const {
    videoRef,
    canvasRef,
    isStreaming: isCameraOn,
    error: cameraError,
    startCamera,
    stopCamera,
    captureFrame,
  } = useWebcam({ fps: 2, width: 640, height: 480 })

  // Behaviour analysis hook
  const {
    snapshot,
    history,
    report,
    isAnalysing,
    noFace,
    error: analysisError,
    startAnalysis,
    stopAnalysis,
  } = useBehaviourAnalysis(wsUrl)

  // Report dismiss
  const [reportDismissed, setReportDismissed] = useState(false)

  // Orchestrated start: camera → then analysis
  const startInterview = useCallback(async () => {
    setReportDismissed(false)
    await startCamera()
    // Small delay to let the camera warm up
    setTimeout(() => {
      startAnalysis(captureFrame)
    }, 800)
  }, [startCamera, startAnalysis, captureFrame])

  // Orchestrated stop: analysis → then camera
  const stopInterview = useCallback(() => {
    stopAnalysis()
    // Keep camera on for a moment so the report can capture a final snapshot
    setTimeout(() => {
      stopCamera()
    }, 2500)
  }, [stopAnalysis, stopCamera])

  const dismissReport = useCallback(() => setReportDismissed(true), [])

  return (
    <AntigravityContext.Provider
      value={{
        antigravityEnabled,
        toggleAntigravity,
        videoRef,
        canvasRef,
        isCameraOn,
        cameraError,
        startCamera,
        stopCamera,
        snapshot,
        history,
        report: reportDismissed ? null : report,
        isAnalysing,
        noFace,
        analysisError,
        startInterview,
        stopInterview,
        dismissReport,
      }}
    >
      {children}
    </AntigravityContext.Provider>
  )
}

// ── Hook ────────────────────────────────────────────────────────────────────

export const useAntigravity = (): AntigravityContextProps => {
  const ctx = useContext(AntigravityContext)
  if (!ctx) {
    throw new Error('useAntigravity must be used within <AntigravityProvider>')
  }
  return ctx
}
