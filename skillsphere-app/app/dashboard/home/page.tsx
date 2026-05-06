'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface CourseRec {
  emoji: string
  name: string
  category: string
  duration: string
  difficulty: string
}

export default function HomeFeed() {
  const [courses, setCourses] = useState<CourseRec[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('Alex')

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (profile?.full_name) {
        setName(profile.full_name.split(' ')[0])
      }

      const interests = profile?.interests || ['Programming']
      
      try {
        const res = await fetch('/api/ml/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ interests })
        })
        const data = await res.json()
        if (Array.isArray(data)) {
          setCourses(data)
        }
      } catch (e) {
        console.error('Failed to load recs', e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="home-hero mb-20">
        <div className="hero-text">
          <h1>Good morning, {name} 👋</h1>
          <p>Your personalized learning journey continues. <strong>12-day streak!</strong> 🔥</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
            <span className="chip violet">💻 Programming</span>
            <span className="chip teal">🤖 AI/ML</span>
            <span className="chip cyan">🧮 DSA</span>
          </div>
        </div>
        <div className="ring-wrap">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="10"
              strokeDasharray="314" strokeDashoffset="79" strokeLinecap="round" transform="rotate(-90 60 60)"/>
          </svg>
          <div className="ring-label">
            <span className="ring-val">847</span>
            <span className="ring-sub">Score</span>
          </div>
        </div>
      </div>

      <div className="grid-4 mb-20">
        <div className="stat-card violet">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">88%</div>
          <div className="stat-label">Avg Test Score</div>
          <div className="stat-trend">↑ +6% this month</div>
        </div>
        <div className="stat-card teal">
          <div className="stat-icon">📚</div>
          <div className="stat-value">5</div>
          <div className="stat-label">Active Courses</div>
          <div className="stat-trend">2 due this week</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">3</div>
          <div className="stat-label">Certifications</div>
          <div className="stat-trend">1 in progress</div>
        </div>
        <div className="stat-card red">
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">3</div>
          <div className="stat-label">Weak Areas</div>
          <div className="stat-trend">Needs attention</div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        <div>
          <div className="section-head">
            <div className="section-title">📌 Job & Skill Posts</div>
            <span className="section-link">View all →</span>
          </div>
          <div className="post-card">
            <div className="post-top">
              <div><div className="post-title">Backend Engineer (Python) — Remote</div><div className="post-meta">TechCorp Inc. · 2h ago · 34 applicants</div></div>
              <span className="chip teal">🏢 Job</span>
            </div>
            <p className="text-sm text-muted" style={{ lineHeight: '1.6' }}>3+ yrs Python, REST APIs, PostgreSQL. Competitive pay + equity.</p>
            <div className="post-actions"><span className="post-action">👍 28</span><span className="post-action">💬 12</span><span className="post-action apply">Apply Now →</span></div>
          </div>
          <div className="post-card">
            <div className="post-top">
              <div><div className="post-title">How I cracked FAANG with DSA in 60 days 🚀</div><div className="post-meta">by Priya Kumar · 5h ago</div></div>
              <span className="chip violet">📝 Post</span>
            </div>
            <p className="text-sm text-muted" style={{ lineHeight: '1.6' }}>My full roadmap, resources and daily schedule. Thread inside!</p>
            <div className="post-actions"><span className="post-action">👍 248</span><span className="post-action">💬 42</span><span className="post-action apply">Read →</span></div>
          </div>
          <div className="post-card">
            <div className="post-top">
              <div><div className="post-title">Co-founder needed — AI-powered EdTech SaaS</div><div className="post-meta">by Rahul Mehta · 1d ago</div></div>
              <span className="chip amber">🤝 Collab</span>
            </div>
            <p className="text-sm text-muted" style={{ lineHeight: '1.6' }}>Building B2B skill assessment. Need React + Node.js. Equity-based.</p>
            <div className="post-actions"><span className="post-action">👍 34</span><span className="post-action">💬 9</span><span className="post-action apply">Connect →</span></div>
          </div>
        </div>

        <div>
          <div className="section-head"><div className="section-title">📈 Your Progress</div></div>
          <div className="card mb-16">
            <div className="progress-wrap">
              <div className="progress-head"><span>Python</span><span className="progress-pct" style={{ color: 'var(--violet)' }}>88%</span></div>
              <div className="progress-track"><div className="progress-fill pf-violet" style={{ width: '88%' }}></div></div>
            </div>
            <div className="progress-wrap">
              <div className="progress-head"><span>DSA & Algorithms</span><span className="progress-pct" style={{ color: 'var(--teal)' }}>72%</span></div>
              <div className="progress-track"><div className="progress-fill pf-teal" style={{ width: '72%' }}></div></div>
            </div>
            <div className="progress-wrap">
              <div className="progress-head"><span>Java</span><span className="progress-pct" style={{ color: 'var(--blue)' }}>55%</span></div>
              <div className="progress-track"><div className="progress-fill pf-blue" style={{ width: '55%' }}></div></div>
            </div>
            <div className="progress-wrap">
              <div className="progress-head"><span>System Design</span><span className="progress-pct" style={{ color: 'var(--red)' }}>40%</span></div>
              <div className="progress-track"><div className="progress-fill pf-red" style={{ width: '40%' }}></div></div>
            </div>
            <div className="progress-wrap" style={{ marginBottom: 0 }}>
              <div className="progress-head"><span>Aptitude</span><span className="progress-pct" style={{ color: 'var(--indigo)' }}>81%</span></div>
              <div className="progress-track"><div className="progress-fill pf-indigo" style={{ width: '81%' }}></div></div>
            </div>
          </div>
          
          <div className="section-head mt-16"><div className="section-title">🤖 AI Course Recommendations</div></div>
          {loading ? (
             <div className="card" style={{ textAlign: 'center', padding: '20px' }}>Loading AI Recommendations...</div>
          ) : courses.length > 0 ? (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {courses.map((c, i) => (
                  <div key={i} className="course-card c-violet" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="course-emoji" style={{ marginBottom: 0, width: '40px', height: '40px', fontSize: '20px' }}>{c.emoji}</div>
                      <div>
                        <div className="course-name" style={{ fontSize: '14px' }}>{c.name}</div>
                        <div className="text-xs text-muted">{c.category} · {c.duration} · {c.difficulty}</div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          ) : (
            <div className="ai-card">
              <div className="ai-card-title">🤖 AI Insights</div>
              <div className="ai-insight"><span className="ai-arrow">→</span>System Design at 40% — focus 30 min/day for 2 weeks to unlock SDE-2 roles.</div>
              <div className="ai-insight"><span className="ai-arrow">→</span>Python score qualifies you for 5 open positions this week.</div>
              <div className="ai-insight" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}><span className="ai-arrow">→</span>One Global Test away from Top 10% globally.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
