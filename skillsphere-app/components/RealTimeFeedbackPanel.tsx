'use client'

import React from 'react'
import type { BehaviourSnapshot } from '@/hooks/useBehaviourAnalysis'

interface Props {
  snapshot: BehaviourSnapshot | null
  noFace: boolean
  isAnalysing: boolean
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function emotionColor(emotion: string): string {
  const map: Record<string, string> = {
    confident: '#34d399',
    happy: '#34d399',
    neutral: '#fbbf24',
    nervous: '#f87171',
    angry: '#f87171',
    sad: '#f87171',
  }
  return map[emotion] ?? '#94a3b8'
}

function emotionLabel(emotion: string): string {
  return emotion.charAt(0).toUpperCase() + emotion.slice(1)
}

function postureIcon(posture: string): string {
  switch (posture) {
    case 'upright':
      return '🧍'
    case 'slouching':
      return '🪑'
    case 'leaning':
      return '↗️'
    default:
      return '❓'
  }
}

// ── Component ───────────────────────────────────────────────────────────────

export default function RealTimeFeedbackPanel({ snapshot, noFace, isAnalysing }: Props) {
  if (!isAnalysing) return null

  const s = snapshot

  return (
    <div style={panelStyle}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: isAnalysing ? '#34d399' : '#94a3b8', display: 'inline-block', animation: isAnalysing ? 'pulse 1.5s infinite' : 'none' }} />
        Live Behaviour Analysis
      </div>

      {noFace && (
        <div style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#f87171', marginBottom: '12px', textAlign: 'center' }}>
          ⚠️ No face detected — adjust your camera
        </div>
      )}

      {s && (
        <>
          {/* Emotion Badge */}
          <div style={metricRow}>
            <span style={{ fontSize: '12px', color: 'var(--text2, #94a3b8)' }}>Emotion</span>
            <span style={{
              background: emotionColor(s.emotion),
              color: '#fff',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              {emotionLabel(s.emotion)} {s.emotion_score}%
            </span>
          </div>

          {/* Eye Contact Ring */}
          <div style={metricRow}>
            <span style={{ fontSize: '12px', color: 'var(--text2, #94a3b8)' }}>Eye Contact</span>
            <div style={{ position: 'relative', width: 44, height: 44 }}>
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="4" />
                <circle cx="22" cy="22" r="18" fill="none"
                  stroke={s.eye_contact_pct > 70 ? '#34d399' : s.eye_contact_pct > 40 ? '#fbbf24' : '#f87171'}
                  strokeWidth="4"
                  strokeDasharray={`${(s.eye_contact_pct / 100) * 113} 113`}
                  strokeLinecap="round"
                  transform="rotate(-90 22 22)"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>
                {s.eye_contact_pct}%
              </div>
            </div>
          </div>

          {/* Posture */}
          <div style={metricRow}>
            <span style={{ fontSize: '12px', color: 'var(--text2, #94a3b8)' }}>Posture</span>
            <span style={{ fontSize: '13px' }}>{postureIcon(s.posture)} {s.posture}</span>
          </div>

          {/* Blink Rate */}
          <div style={metricRow}>
            <span style={{ fontSize: '12px', color: 'var(--text2, #94a3b8)' }}>Blink Rate</span>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>{s.blink_rate} /min</span>
          </div>

          {/* Overall Score */}
          <div style={{
            marginTop: '14px',
            background: `linear-gradient(135deg, ${s.overall_behaviour_score > 70 ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)'}, transparent)`,
            border: `1.5px solid ${s.overall_behaviour_score > 70 ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)'}`,
            borderRadius: '10px',
            padding: '12px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '10px', color: 'var(--text2, #94a3b8)', fontWeight: 600, letterSpacing: '1px', marginBottom: '2px' }}>BEHAVIOUR SCORE</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '28px', fontWeight: 800, color: s.overall_behaviour_score > 70 ? '#34d399' : '#fbbf24' }}>
              {s.overall_behaviour_score}
            </div>
          </div>

          {/* Micro-expression tag */}
          {s.micro_expression !== 'neutral' && (
            <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text2, #94a3b8)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.micro_expression === 'stress signal' ? '#f87171' : '#34d399', display: 'inline-block' }} />
              Micro: {s.micro_expression}
            </div>
          )}
        </>
      )}

      {/* Pulsing animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

// ── Styles ──────────────────────────────────────────────────────────────────

const panelStyle: React.CSSProperties = {
  background: 'var(--surface, #1e293b)',
  border: '1.5px solid var(--border, rgba(148,163,184,0.15))',
  borderRadius: 'var(--r, 14px)',
  padding: '18px',
  boxShadow: 'var(--shadow, 0 4px 16px rgba(0,0,0,0.12))',
}

const metricRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0',
  borderBottom: '1px solid var(--border2, rgba(148,163,184,0.08))',
}
