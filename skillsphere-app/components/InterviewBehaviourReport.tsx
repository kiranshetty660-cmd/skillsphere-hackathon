'use client'

import React, { useState } from 'react'
import type { SessionReport, BehaviourSnapshot } from '@/hooks/useBehaviourAnalysis'

interface Props {
  report: SessionReport
  history: BehaviourSnapshot[]
  onClose: () => void
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const metricLabels: Record<string, string> = {
  eye_contact: 'Eye Contact',
  emotion_score: 'Emotional Confidence',
  shoulder_symmetry: 'Posture Symmetry',
  posture_score: 'Upright Posture',
  head_stability: 'Head Stability',
  overall: 'Overall',
}

function scoreColor(score: number): string {
  if (score >= 75) return '#34d399'
  if (score >= 50) return '#fbbf24'
  return '#f87171'
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}m ${s}s`
}

// ── Radar Chart (pure SVG) ──────────────────────────────────────────────────

function RadarChart({ metrics }: { metrics: Record<string, number> }) {
  const keys = ['eye_contact', 'emotion_score', 'shoulder_symmetry', 'posture_score', 'head_stability']
  const labels = keys.map((k) => metricLabels[k] || k)
  const values = keys.map((k) => (metrics[k] ?? 0) / 100)
  const n = keys.length
  const cx = 120, cy = 120, r = 90

  const angleStep = (2 * Math.PI) / n
  const offset = -Math.PI / 2

  const gridLevels = [0.25, 0.5, 0.75, 1.0]

  const point = (i: number, scale: number) => {
    const angle = offset + i * angleStep
    return {
      x: cx + r * scale * Math.cos(angle),
      y: cy + r * scale * Math.sin(angle),
    }
  }

  const dataPoints = values.map((v, i) => point(i, v))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <svg width="240" height="260" viewBox="0 0 240 260" style={{ display: 'block', margin: '0 auto' }}>
      {/* Grid rings */}
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => point(i, level))
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
        return <path key={level} d={path} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
      })}

      {/* Spokes */}
      {Array.from({ length: n }, (_, i) => {
        const p = point(i, 1)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
      })}

      {/* Data polygon */}
      <path d={dataPath} fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="2" />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#34d399" />
      ))}

      {/* Labels */}
      {labels.map((label, i) => {
        const p = point(i, 1.22)
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: 'var(--text2, #94a3b8)', fontWeight: 600 }}>
            {label}
          </text>
        )
      })}
    </svg>
  )
}

// ── Emotion Timeline (pure SVG area chart) ──────────────────────────────────

function EmotionTimeline({ timeline }: { timeline: SessionReport['timeline'] }) {
  if (timeline.length < 2) return <div style={{ fontSize: '12px', color: 'var(--text2)', textAlign: 'center', padding: '20px' }}>Not enough data for timeline</div>

  const w = 500, h = 140, padX = 40, padY = 20
  const chartW = w - padX * 2
  const chartH = h - padY * 2
  const maxT = timeline[timeline.length - 1].t || 1

  const pts = timeline.map((d) => ({
    x: padX + (d.t / maxT) * chartW,
    y: padY + chartH - (d.score / 100) * chartH,
  }))

  const areaPath = `M ${padX} ${padY + chartH} ` + pts.map((p) => `L ${p.x} ${p.y}`).join(' ') + ` L ${padX + chartW} ${padY + chartH} Z`
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(52,211,153,0.3)" />
          <stop offset="100%" stopColor="rgba(52,211,153,0)" />
        </linearGradient>
      </defs>
      {/* Y axis labels */}
      {[0, 25, 50, 75, 100].map((v) => {
        const y = padY + chartH - (v / 100) * chartH
        return (
          <g key={v}>
            <line x1={padX} y1={y} x2={padX + chartW} y2={y} stroke="rgba(148,163,184,0.1)" strokeWidth="1" />
            <text x={padX - 6} y={y + 3} textAnchor="end" style={{ fontSize: '9px', fill: 'var(--text2, #94a3b8)' }}>{v}</text>
          </g>
        )
      })}
      <path d={areaPath} fill="url(#areaGrad)" />
      <path d={linePath} fill="none" stroke="#34d399" strokeWidth="2" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#34d399" />
      ))}
      <text x={w / 2} y={h - 2} textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--text2, #94a3b8)' }}>
        Time (seconds)
      </text>
    </svg>
  )
}

// ── Main Component ──────────────────────────────────────────────────────────

export default function InterviewBehaviourReport({ report, history, onClose }: Props) {
  const [activeSection, setActiveSection] = useState<'overview' | 'timeline' | 'coaching'>('overview')

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '20px', fontWeight: 800 }}>
              📊 Interview Behaviour Report
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text2, #94a3b8)', marginTop: '4px' }}>
              Duration: {formatDuration(report.duration_seconds)} · {report.total_snapshots} snapshots analysed
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {(['overview', 'timeline', 'coaching'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: '1.5px solid ' + (activeSection === tab ? 'var(--teal, #0d9488)' : 'var(--border, rgba(148,163,184,0.15))'),
                background: activeSection === tab ? 'var(--teal-bg, rgba(13,148,136,0.08))' : 'transparent',
                color: activeSection === tab ? 'var(--teal, #0d9488)' : 'var(--text2, #94a3b8)',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: "'Syne',sans-serif",
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'overview' ? '📈 Overview' : tab === 'timeline' ? '📉 Timeline' : '🎯 Coaching'}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeSection === 'overview' && (
          <div>
            {/* Overall Score */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text2, #94a3b8)', fontWeight: 600, letterSpacing: '1px' }}>OVERALL BEHAVIOUR SCORE</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '48px', fontWeight: 800, color: scoreColor(report.averages.overall ?? 0) }}>
                {Math.round(report.averages.overall ?? 0)}
              </div>
            </div>

            {/* Radar chart */}
            <RadarChart metrics={report.averages} />

            {/* Strengths & Improvements */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
              <div style={{ background: 'rgba(52,211,153,0.06)', border: '1.5px solid rgba(52,211,153,0.2)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '12px', fontWeight: 800, color: '#34d399', marginBottom: '10px' }}>💪 Strengths</div>
                {report.strengths.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '4px 0', borderBottom: '1px solid rgba(52,211,153,0.1)' }}>
                    <span>{metricLabels[s.metric] || s.metric}</span>
                    <span style={{ fontWeight: 700, color: '#34d399' }}>{Math.round(s.score)}%</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(251,191,36,0.06)', border: '1.5px solid rgba(251,191,36,0.2)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '12px', fontWeight: 800, color: '#fbbf24', marginBottom: '10px' }}>🔧 Areas to Improve</div>
                {report.improvements.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '4px 0', borderBottom: '1px solid rgba(251,191,36,0.1)' }}>
                    <span>{metricLabels[s.metric] || s.metric}</span>
                    <span style={{ fontWeight: 700, color: '#fbbf24' }}>{Math.round(s.score)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {activeSection === 'timeline' && (
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>Emotion Confidence Over Time</div>
            <div style={{ background: 'var(--bg2, rgba(30,41,59,0.5))', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
              <EmotionTimeline timeline={report.timeline} />
            </div>

            {/* Metric averages table */}
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>Metric Averages</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.entries(report.averages).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                  <span style={{ flex: 1, color: 'var(--text2, #94a3b8)' }}>{metricLabels[key] || key}</span>
                  <div style={{ flex: 2, height: '7px', background: 'rgba(148,163,184,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(val, 100)}%`, height: '100%', background: scoreColor(val), borderRadius: '4px', transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ width: '36px', textAlign: 'right', fontWeight: 700, color: scoreColor(val) }}>{Math.round(val)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coaching */}
        {activeSection === 'coaching' && (
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '16px' }}>🎯 Personalised Coaching Tips</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {report.coaching.map((tip, i) => (
                <div key={i} style={{
                  background: 'var(--surface, #1e293b)',
                  border: '1.5px solid var(--border, rgba(148,163,184,0.15))',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>
                    {i === 0 ? '👁️' : i === 1 ? '🪑' : i === 2 ? '🧠' : '💡'}
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            {/* Export PDF button (placeholder) */}
            <button
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1.5px solid var(--teal, #0d9488)',
                background: 'var(--teal-bg, rgba(13,148,136,0.08))',
                color: 'var(--teal, #0d9488)',
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: "'Syne',sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onClick={() => {
                // Future: implement PDF export via html2canvas or jsPDF
                alert('PDF export coming soon!')
              }}
            >
              📄 Export Report as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Styles ──────────────────────────────────────────────────────────────────

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px',
}

const modalStyle: React.CSSProperties = {
  background: 'var(--bg, #0f172a)',
  border: '1.5px solid var(--border, rgba(148,163,184,0.15))',
  borderRadius: '16px',
  padding: '28px',
  width: '100%',
  maxWidth: '640px',
  maxHeight: '85vh',
  overflowY: 'auto',
  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
}

const closeBtnStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: '1px solid var(--border, rgba(148,163,184,0.15))',
  background: 'transparent',
  color: 'var(--text2, #94a3b8)',
  fontSize: '14px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
