'use client'

import { useState } from 'react'

export default function TestingPage() {
  const [activeTab, setActiveTab] = useState('aptizone')

  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="tabs-wrap" id="testing-tabs">
        <div className={`tab ${activeTab === 'aptizone' ? 'active' : ''}`} onClick={() => setActiveTab('aptizone')}>🧠 AptiZone</div>
        <div className={`tab ${activeTab === 'yourtest' ? 'active' : ''}`} onClick={() => setActiveTab('yourtest')}>🎯 Your Test</div>
        <div className={`tab ${activeTab === 'aibooster' ? 'active' : ''}`} onClick={() => setActiveTab('aibooster')}>🤖 AI Booster</div>
        <div className={`tab ${activeTab === 'globaltest' ? 'active' : ''}`} onClick={() => setActiveTab('globaltest')}>🌍 Global Test</div>
      </div>

      {activeTab === 'aptizone' && (
        <div id="testab-aptizone">
          <div className="section-head mb-16">
            <div className="section-title">🧠 Aptitude Mastery</div>
            <span className="chip indigo">Your Score: 81%</span>
          </div>
          <div className="grid-3 mb-24">
            <div className="test-card">
              <div className="test-icon">🔢</div>
              <div className="test-name">Quantitative Aptitude</div>
              <div className="test-meta">Numbers, Algebra, Probability</div>
              <div className="progress-track"><div className="progress-fill pf-violet" style={{ width: '85%' }}></div></div>
              <button className="btn btn-violet" style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '9px' }}>Take Practice Test</button>
            </div>
            <div className="test-card">
              <div className="test-icon">🧩</div>
              <div className="test-name">Logical Reasoning</div>
              <div className="test-meta">Puzzles, Syllogisms, Patterns</div>
              <div className="progress-track"><div className="progress-fill pf-blue" style={{ width: '72%' }}></div></div>
              <button className="btn btn-blue" style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '9px' }}>Take Practice Test</button>
            </div>
            <div className="test-card">
              <div className="test-icon">📖</div>
              <div className="test-name">Verbal Ability</div>
              <div className="test-meta">Grammar, Comprehension</div>
              <div className="progress-track"><div className="progress-fill pf-teal" style={{ width: '90%' }}></div></div>
              <button className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '9px' }}>Take Practice Test</button>
            </div>
          </div>
          <div className="card">
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>📊 Recent Performance</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span>Quant Mock Test #4</span><span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: 'var(--violet)' }}>18/20</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span>Logical Reasoning Quiz</span><span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: 'var(--blue)' }}>14/15</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'yourtest' && (
        <div id="testab-yourtest">
          <div className="section-head mb-16">
            <div className="section-title">🎯 Subject-Specific Tests</div>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            <div className="test-card">
              <div className="test-icon">🐍</div>
              <div className="test-name">Python Certification Test</div>
              <div className="test-meta">50 mins · 40 Questions · Intermediate</div>
              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', marginTop: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '4px' }}>Previous Score</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 800, color: 'var(--violet)' }}>84%</div>
              </div>
              <button className="btn btn-violet" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>Start Retake Test →</button>
            </div>
            <div className="test-card">
              <div className="test-icon">🧮</div>
              <div className="test-name">DSA Problem Solving</div>
              <div className="test-meta">90 mins · 3 Coding Problems · Advanced</div>
              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', marginTop: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '4px' }}>Previous Score</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 800, color: 'var(--teal)' }}>68%</div>
              </div>
              <button className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>Start Retake Test →</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'aibooster' && (
        <div id="testab-aibooster">
          <div className="section-head mb-16">
            <div className="section-title">🤖 AI Test Booster</div>
            <span className="chip pink">Gemini Powered</span>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            <div>
              <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>🎯 Generate Custom Quiz</div>
                <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '16px', lineHeight: '1.5' }}>Ask AI to generate a targeted test based on your weak areas.</p>
                <textarea className="input-field" style={{ minHeight: '100px', marginBottom: '12px' }} placeholder="E.g., Generate a 10-question quiz on Dynamic Programming emphasizing the knapsack problem..."></textarea>
                <button className="btn btn-violet btn-full">Generate Test with AI ✨</button>
              </div>
            </div>
            <div>
              <div className="ai-card" style={{ background: 'linear-gradient(145deg,var(--blue-bg),#dbeafe)', borderColor: 'var(--blue-mid)' }}>
                <div className="ai-card-title">🧠 Weakness Analysis</div>
                <div className="ai-insight"><span className="ai-arrow">→</span>You consistently miss questions on <strong>Dynamic Programming</strong> (40% accuracy).</div>
                <div className="ai-insight"><span className="ai-arrow">→</span>In Quantitative Aptitude, <strong>Probability</strong> questions take you 2x longer than average.</div>
                <div className="ai-insight" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}><span className="ai-arrow">→</span>Recommend generating a custom 15-question quiz focusing strictly on these two topics.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'globaltest' && (
        <div id="testab-globaltest">
          <div className="section-head mb-16">
            <div className="section-title">🌍 Global Skill Assessment</div>
            <span className="chip orange">Live Ranking</span>
          </div>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', background: 'linear-gradient(145deg,var(--surface),var(--orange-bg))', borderColor: 'var(--orange-mid)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '24px', fontWeight: 800, color: 'var(--orange)', marginBottom: '8px' }}>Monthly Global Test</div>
            <p style={{ fontSize: '14px', color: 'var(--text2)', maxWidth: '400px', marginBottom: '24px', lineHeight: '1.6' }}>Compete with thousands of learners globally. Your score directly impacts your community leaderboard rank and job matches.</p>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--surface)', padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text2)', marginBottom: '4px' }}>Next Test Starts In</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 800 }}>4 Days</div>
              </div>
              <div style={{ background: 'var(--surface)', padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text2)', marginBottom: '4px' }}>Current Global Rank</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 800, color: 'var(--violet)' }}>#4,231</div>
              </div>
            </div>
            <button className="btn" style={{ background: 'var(--orange)', color: 'white', border: 'none', padding: '12px 24px', fontSize: '14px', fontWeight: 800, borderRadius: 'var(--r-sm)' }}>Register for Next Test →</button>
          </div>
        </div>
      )}
    </div>
  )
}
