'use client'

import { useEffect, useState } from 'react'

export default function PerformancePage() {
  const [skillGap, setSkillGap] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyzeSkillGap = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ml/skillgap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          completed_courses: ['Python', 'DSA Basics'], 
          target_role: 'Backend Engineer' 
        })
      })
      const data = await res.json()
      setSkillGap(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="perf-hero mb-24">
        <div>
          <div style={{ fontSize: '11px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Overall Skill Score</div>
          <div className="perf-big-score">847</div>
          <div className="perf-score-label">Top 15% globally · Rank #4,231 of 28,000</div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 700 }}>↑ +34 this week</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 700 }}>SDE-1 Ready ✓</span>
          </div>
        </div>
        <div className="perf-divider"></div>
        <div className="perf-stats">
          <div className="perf-mini">
            <div className="ring-wrap">
              <svg width="76" height="76" viewBox="0 0 76 76">
                <circle cx="38" cy="38" r="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="7"/>
                <circle cx="38" cy="38" r="30" fill="none" stroke="white" strokeWidth="7"
                  strokeDasharray="188" strokeDashoffset="47" strokeLinecap="round" transform="rotate(-90 38 38)"/>
              </svg>
              <div className="ring-label"><span className="ring-val" style={{ fontSize: '16px' }}>75%</span></div>
            </div>
            <div style={{ fontSize: '11px', opacity: 0.75, marginTop: '6px', textAlign: 'center' }}>Completion</div>
          </div>
          <div className="perf-mini"><div className="perf-mini-val">88%</div><div className="perf-mini-label">Avg Score</div></div>
          <div className="perf-mini"><div className="perf-mini-val">24h</div><div className="perf-mini-label">Study Time</div></div>
          <div className="perf-mini"><div className="perf-mini-val">12🔥</div><div className="perf-mini-label">Day Streak</div></div>
          <div className="perf-mini"><div className="perf-mini-val">3</div><div className="perf-mini-label">Weak Areas</div></div>
        </div>
      </div>

      <div className="grid-4 mb-24">
        <div className="stat-card green"><div className="stat-icon">✅</div><div className="stat-value">88%</div><div className="stat-label">Avg Test Score</div><div className="stat-trend">↑ +6% vs last month</div></div>
        <div className="stat-card blue"><div className="stat-icon">⏱️</div><div className="stat-value">24h</div><div className="stat-label">Learning Time</div><div className="stat-trend">This month</div></div>
        <div className="stat-card cyan"><div className="stat-icon">📖</div><div className="stat-value">62%</div><div className="stat-label">Course Completion</div><div className="stat-trend">On track</div></div>
        <div className="stat-card orange"><div className="stat-icon">⚡</div><div className="stat-value">3</div><div className="stat-label">Weak Areas</div><div className="stat-trend">Action needed</div></div>
      </div>

      <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
        <div>
          <div className="section-head"><div className="section-title">🎯 Skill Breakdown</div></div>
          <div className="card">
            <div className="progress-wrap"><div className="progress-head"><span>Python</span><span className="progress-pct" style={{ color: 'var(--violet)' }}>88%</span></div><div className="progress-track" style={{ height: '9px' }}><div className="progress-fill pf-violet" style={{ width: '88%' }}></div></div></div>
            <div className="progress-wrap"><div className="progress-head"><span>Aptitude</span><span className="progress-pct" style={{ color: 'var(--indigo)' }}>81%</span></div><div className="progress-track" style={{ height: '9px' }}><div className="progress-fill pf-indigo" style={{ width: '81%' }}></div></div></div>
            <div className="progress-wrap"><div className="progress-head"><span>DSA & Algorithms</span><span className="progress-pct" style={{ color: 'var(--teal)' }}>72%</span></div><div className="progress-track" style={{ height: '9px' }}><div className="progress-fill pf-teal" style={{ width: '72%' }}></div></div></div>
            <div className="progress-wrap"><div className="progress-head"><span>Java</span><span className="progress-pct" style={{ color: 'var(--blue)' }}>55%</span></div><div className="progress-track" style={{ height: '9px' }}><div className="progress-fill pf-blue" style={{ width: '55%' }}></div></div></div>
            <div className="progress-wrap" style={{ marginBottom: 0 }}><div className="progress-head"><span>System Design</span><span className="progress-pct" style={{ color: 'var(--red)' }}>40%</span></div><div className="progress-track" style={{ height: '9px' }}><div className="progress-fill pf-red" style={{ width: '40%' }}></div></div></div>
          </div>
        </div>
        <div>
          <div className="section-head"><div className="section-title">📅 60-Day Study Plan</div></div>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: 'var(--teal-bg)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--teal-mid)' }}>
              <div style={{ fontSize: '18px' }}>✅</div>
              <div><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--teal)' }}>Week 1-2: Arrays & Strings</div><div className="text-xs text-muted">Completed · 100%</div></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: 'var(--violet-bg)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--violet-mid)' }}>
              <div style={{ fontSize: '18px' }}>🔄</div>
              <div><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--violet)' }}>Week 3-4: Trees & Graphs</div><div className="text-xs text-muted">In progress · 62%</div></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: 'var(--amber-bg)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--amber-mid)', opacity: 0.6 }}>
              <div style={{ fontSize: '18px' }}>🔒</div>
              <div><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--amber)' }}>Week 5-6: Dynamic Programming</div><div className="text-xs text-muted">Starts Mar 8</div></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: 'var(--blue-bg)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--blue-mid)', opacity: 0.6 }}>
              <div style={{ fontSize: '18px' }}>🔒</div>
              <div><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)' }}>Week 7-8: System Design</div><div className="text-xs text-muted">Starts Mar 22</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="ai-card-title" style={{ marginBottom: 0 }}>🤖 AI Skill Gap Analysis</div>
          <button className="btn btn-blue" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={analyzeSkillGap} disabled={loading}>
            {loading ? 'Analysing...' : 'Run Analysis →'}
          </button>
        </div>
        
        {skillGap ? (
          <div>
             <div style={{ marginBottom: '10px', fontSize: '13px' }}><strong>Target Role:</strong> Backend Engineer</div>
             <div style={{ marginBottom: '10px', fontSize: '13px' }}><strong>Readiness:</strong> {skillGap.completion_pct}%</div>
             
             <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                {skillGap.gaps?.map((gap: string, i: number) => (
                  <span key={i} className="chip red">{gap}</span>
                ))}
             </div>
             
             <div style={{ marginTop: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>Next Steps:</div>
                <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text2)', margin: 0 }}>
                  {skillGap.next_steps?.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
             </div>
             <div style={{ marginTop: '10px', fontStyle: 'italic', fontSize: '12px', color: 'var(--violet)' }}>
                Tip: {skillGap.tip}
             </div>
          </div>
        ) : (
          <div className="grid-2" style={{ gap: '16px' }}>
            <div>
              <div className="ai-insight"><span className="ai-arrow">→</span>Python 88% — you're ready for the Python Certification test this week.</div>
              <div className="ai-insight"><span className="ai-arrow">→</span>System Design gap is your biggest blocker for senior roles. Focus 30 min/day.</div>
            </div>
            <div>
              <div className="ai-insight"><span className="ai-arrow">→</span>Top 15% globally — one more Global Test can push you to Top 10%.</div>
              <div className="ai-insight" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}><span className="ai-arrow">→</span>3 job posts match your profile. Apply this week before they close.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
