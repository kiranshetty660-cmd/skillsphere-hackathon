'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

interface UseWebcamOptions {
  /** Frames per second to capture & send. Default 2 (500ms). */
  fps?: number
  /** Width of the capture canvas. Default 640. */
  width?: number
  /** Height of the capture canvas. Default 480. */
  height?: number
}

interface UseWebcamReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  isStreaming: boolean
  error: string | null
  startCamera: () => Promise<void>
  stopCamera: () => void
  /** Returns a base64-encoded JPEG frame from the current video. */
  captureFrame: () => string | null
}

export function useWebcam(options: UseWebcamOptions = {}): UseWebcamReturn {
  const { fps = 2, width = 640, height = 480 } = options

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: width }, height: { ideal: height }, facingMode: 'user' },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsStreaming(true)
    } catch (err: any) {
      setError(err.message || 'Camera access denied')
      setIsStreaming(false)
    }
  }, [width, height])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }, [])

  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || !isStreaming) return null

    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(video, 0, 0, width, height)
    // Return base64 JPEG (quality 0.7 to keep payload small)
    return canvas.toDataURL('image/jpeg', 0.7)
  }, [isStreaming, width, height])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  return { videoRef, canvasRef, isStreaming, error, startCamera, stopCamera, captureFrame }
}
