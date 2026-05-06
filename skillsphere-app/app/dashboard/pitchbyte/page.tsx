'use client'

import { useState } from 'react'
import { useAntigravity } from '@/components/AntigravityProvider'
import RealTimeFeedbackPanel from '@/components/RealTimeFeedbackPanel'
import InterviewBehaviourReport from '@/components/InterviewBehaviourReport'

export default function PitchBytePage() {
  const [activeTab, setActiveTab] = useState('mock-interview')
  const [detectorText, setDetectorText] = useState('')
  const [detecting, setDetecting] = useState(false)
  const [detectorResult, setDetectorResult] = useState<any>(null)

  const {
    videoRef,
    canvasRef,
    isCameraOn,
    cameraError,
    snapshot,
    history,
    report,
    isAnalysing,
    noFace,
    analysisError,
    startInterview,
    stopInterview,
    dismissReport,
  } = useAntigravity()

  const handleDetect = async () => {
    if (!detectorText) return
    setDetecting(true)
    try {
      const res = await fetch('/api/ml/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: detectorText })
      })
      const data = await res.json()
      setDetectorResult(data)
    } catch (e) {
      console.error(e)
    } finally {
      setDetecting(false)
    }
  }

  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="section-head mb-24">
        <div className="section-title">🎙️ Pitch Byte — Communication Lab</div>
      </div>

      <div className="grid-4 mb-24">
        <div 
          id="ftab-mock-interview" 
          className={`pb-feature-card ${activeTab === 'mock-interview' ? 'pb-active' : ''}`}
          onClick={() => setActiveTab('mock-interview')}
        >
          <div className="pb-icon pb-bg-teal">💼</div>
          <div className="pb-title">Mock Interview</div>
          <div className="pb-desc">Practice with AI avatars</div>
        </div>
        <div 
          id="ftab-personality" 
          className={`pb-feature-card ${activeTab === 'personality' ? 'pb-active' : ''}`}
          onClick={() => setActiveTab('personality')}
        >
          <div className="pb-icon pb-bg-amber">🎭</div>
          <div className="pb-title">Personality Dev</div>
          <div className="pb-desc">Body language & presence</div>
        </div>
        <div 
          id="ftab-ai-detector" 
          className={`pb-feature-card ${activeTab === 'ai-detector' ? 'pb-active' : ''}`}
          onClick={() => setActiveTab('ai-detector')}
        >
          <div className="pb-icon pb-bg-blue">🤖</div>
          <div className="pb-title">AI Content Detector</div>
          <div className="pb-desc">Check resume/essay authenticity</div>
        </div>
        <div 
          id="ftab-vocal-shift" 
          className={`pb-feature-card ${activeTab === 'vocal-shift' ? 'pb-active' : ''}`}
          onClick={() => setActiveTab('vocal-shift')}
        >
          <div className="pb-icon pb-bg-violet">🗣️</div>
          <div className="pb-title">Vocal Shift</div>
          <div className="pb-desc">Tone & pronunciation analysis</div>
        </div>
      </div>

      {activeTab === 'mock-interview' && (
        <div id="panel-mock-interview" className="pb-panel">
          <div className="section-head mb-16">
            <div className="section-title">💼 Mock Interview Simulator</div>
            <span className={`chip ${isAnalysing ? 'amber' : 'teal'}`}>
              {isAnalysing ? '🔴 Recording' : 'Ready'}
            </span>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            {/* Left: Video panel */}
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#1e2432', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* Hidden canvas for frame capture */}
                <canvas ref={canvasRef} style={{ display: 'none' }} />

                {/* Webcam feed or placeholder */}
                {isCameraOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                  />
                ) : (
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#34d399,#0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: '0 0 0 10px rgba(52,211,153,0.2)' }}>👨‍💼</div>
                )}

                {/* Camera error */}
                {cameraError && (
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(248,113,113,0.9)', color: 'white', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                    ⚠️ {cameraError}
                  </div>
                )}

                {/* Analysis error */}
                {analysisError && (
                  <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', background: 'rgba(251,191,36,0.9)', color: '#1e1e1e', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                    ⚠️ {analysisError}
                  </div>
                )}

                {/* Recording indicator */}
                {isAnalysing && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '20px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff4757', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ color: 'white', fontSize: '10px', fontWeight: 600 }}>LIVE</span>
                  </div>
                )}

                <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                  {isCameraOn ? 'Your Camera Feed' : 'Interviewer: AI Sarah (HR)'}
                </div>
              </div>
              <div style={{ padding: '16px', borderTop: '1px solid var(--border2)' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>Current Question:</div>
                <div style={{ fontSize: '15px', color: 'var(--text)', fontStyle: 'italic', marginBottom: '16px' }}>"Tell me about a time you had to learn a new technology quickly to solve a problem."</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {!isAnalysing ? (
                    <button className="btn btn-teal" style={{ flex: 1, justifyContent: 'center' }} onClick={startInterview}>
                      ⏺ Start Interview + Camera
                    </button>
                  ) : (
                    <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', borderColor: '#f87171', color: '#f87171' }} onClick={stopInterview}>
                      ⏹ End Interview
                    </button>
                  )}
                  <button className="btn btn-ghost">Next Q</button>
                </div>
              </div>
            </div>

            {/* Right: Setup + Live Feedback */}
            <div>
              <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>Interview Setup</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="input-group" style={{ marginBottom: 0 }}>
                    <div className="input-label">Role</div>
                    <select className="input-field" defaultValue="backend">
                      <option value="backend">Backend Engineer</option>
                      <option value="frontend">Frontend Developer</option>
                      <option value="data">Data Scientist</option>
                    </select>
                  </div>
                  <div className="input-group" style={{ marginBottom: 0 }}>
                    <div className="input-label">Interview Type</div>
                    <select className="input-field" defaultValue="behavioral">
                      <option value="behavioral">Behavioral (HR)</option>
                      <option value="technical">Technical (System Design)</option>
                      <option value="coding">Live Coding</option>
                    </select>
                  </div>
                  <div className="input-group" style={{ marginBottom: 0 }}>
                    <div className="input-label">Difficulty</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span className="chip teal" style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>Entry</span>
                      <span className="chip amber" style={{ flex: 1, textAlign: 'center', cursor: 'pointer', opacity: 0.5 }}>Mid</span>
                      <span className="chip red" style={{ flex: 1, textAlign: 'center', cursor: 'pointer', opacity: 0.5 }}>Senior</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Feedback Panel — appears when analysis is active */}
              <RealTimeFeedbackPanel snapshot={snapshot} noFace={noFace} isAnalysing={isAnalysing} />

              {/* Static fallback when not analysing */}
              {!isAnalysing && (
                <div className="ai-card">
                  <div className="ai-card-title">🤖 Real-Time Feedback</div>
                  <div className="ai-insight"><span className="ai-arrow">→</span>Start the interview to enable live behaviour analysis</div>
                  <div className="ai-insight" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}><span className="ai-arrow">→</span>Camera + AI will track eye contact, posture, emotion & more</div>
                </div>
              )}
            </div>
          </div>

          {/* Session Report Modal */}
          {report && (
            <InterviewBehaviourReport report={report} history={history} onClose={dismissReport} />
          )}
        </div>
      )}

      {activeTab === 'personality' && (
        <div id="panel-personality" className="pb-panel">
          <div className="section-head mb-16">
            <div className="section-title">🎭 Personality Development</div>
            <span className="chip amber">Module 4 of 12</span>
          </div>
          <div className="grid-3" style={{ gap: '16px' }}>
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--bg2)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>▶️</div>
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Mastering Body Language in Video Calls</div>
              <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6' }}>Learn how to frame your shot, use hand gestures effectively, and maintain natural eye contact during remote interviews and meetings.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="card" style={{ background: 'var(--amber-bg)', borderColor: 'var(--amber-mid)' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🤝</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>Communication Style</div>
                <div style={{ fontSize: '12px', color: 'var(--text2)' }}>Your profile leans towards <strong>Analytical & Direct</strong>. Best suited for technical deep-dives.</div>
              </div>
              <div className="card">
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>Course Progress</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--green)' }}>✓</span> 1. Active Listening</div>
                  <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--green)' }}>✓</span> 2. Conflict Resolution</div>
                  <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--green)' }}>✓</span> 3. Public Speaking Basics</div>
                  <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--amber)' }}><span>▶</span> 4. Body Language</div>
                  <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text3)' }}><span>🔒</span> 5. Emotional Intelligence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai-detector' && (
        <div id="panel-ai-detector" className="pb-panel">
          <div className="section-head mb-16">
            <div className="section-title">🤖 AI Content Detector</div>
            <span className="chip blue">Gemini Engine v2.0</span>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            <div>
              <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>✍️ Text Analysis</div>
                <p style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '16px' }}>Paste your resume summary, cover letter, or essay. We'll check if it sounds too AI-generated.</p>
                <textarea 
                  className="input-field" 
                  style={{ minHeight: '180px', marginBottom: '16px', lineHeight: '1.5' }} 
                  placeholder="Paste your text here..."
                  value={detectorText}
                  onChange={(e) => setDetectorText(e.target.value)}
                ></textarea>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="btn btn-blue" 
                    style={{ flex: 1, justifyContent: 'center' }} 
                    onClick={handleDetect}
                    disabled={detecting || !detectorText}
                  >
                    {detecting ? '⏳ Analysing...' : 'Analyse Content'}
                  </button>
                  <button 
                    className="btn btn-ghost" 
                    style={{ flexShrink: 0, padding: '10px 16px' }} 
                    onClick={() => { setDetectorText(''); setDetectorResult(null); }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="card" style={{ background: 'var(--blue-bg)', borderColor: 'var(--blue-mid)' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '13px', fontWeight: 800, color: 'var(--blue)', marginBottom: '10px' }}>📁 Supported Formats</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="chip blue">Plain Text</span><span className="chip blue">PDF</span><span className="chip blue">Word Doc</span><span className="chip blue">Essay</span><span className="chip blue">Cover Letter</span>
                </div>
              </div>
            </div>
            
            <div>
              <div id="detector-result" className="card" style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '16px' }}>📊 Analysis Result</div>
                
                {!detectorResult ? (
                  <div style={{ textAlign: 'center', color: 'var(--text2)', fontSize: '13px', padding: '40px 0' }}>
                    Enter text and click Analyse to see results.
                  </div>
                ) : (
                  <>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <svg width="140" height="140" viewBox="0 0 140 140">
                          <circle cx="70" cy="70" r="56" fill="none" stroke="#f1f5f9" strokeWidth="12"/>
                          <circle cx="70" cy="70" r="56" fill="none" stroke="url(#detGrad)" strokeWidth="12"
                            strokeDasharray="352" strokeDashoffset={352 - (352 * detectorResult.ai_probability / 100)} strokeLinecap="round" transform="rotate(-90 70 70)"/>
                          <defs>
                            <linearGradient id="detGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6"/>
                              <stop offset="100%" stopColor="#7c5cfc"/>
                            </linearGradient>
                          </defs>
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '26px', fontWeight: 800, color: 'var(--blue)' }}>
                            {detectorResult.ai_probability}%
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--text2)', fontWeight: 600 }}>AI PROBABILITY</div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ 
                      background: detectorResult.ai_probability > 50 ? 'linear-gradient(145deg,var(--amber-bg),#fef3c7)' : 'linear-gradient(145deg,var(--green-bg),#dcfce7)', 
                      border: `1.5px solid ${detectorResult.ai_probability > 50 ? 'var(--amber-mid)' : 'var(--green-mid)'}`, 
                      borderRadius: 'var(--r-sm)', padding: '12px', marginBottom: '10px' 
                    }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '13px', fontWeight: 800, color: detectorResult.ai_probability > 50 ? 'var(--amber)' : 'var(--green)', marginBottom: '4px' }}>
                        {detectorResult.ai_probability > 50 ? '⚠️ ' : '✅ '}{detectorResult.verdict}
                      </div>
                      <div style={{ fontSize: '12px', color: detectorResult.ai_probability > 50 ? '#92400e' : '#166534', lineHeight: '1.5' }}>
                        {detectorResult.reason}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vocal-shift' && (
        <div id="panel-vocal-shift" className="pb-panel">
          <div className="section-head mb-16">
            <div className="section-title">🎙️ Vocal Shift — Voice Lab</div>
            <span className="chip teal">Live Analysis</span>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            <div>
              <div style={{ background: 'linear-gradient(135deg,#0d9488,#0891b2)', borderRadius: 'var(--r)', padding: '24px', marginBottom: '16px', color: 'white', boxShadow: '0 8px 24px rgba(13,148,136,0.25)' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '15px', fontWeight: 800, marginBottom: '4px' }}>🎙️ Voice Recorder</div>
                <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '20px' }}>Speak naturally for 30 seconds for best analysis</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '48px', marginBottom: '20px' }}>
                  {[30, 60, 90, 70, 40, 80, 55, 95, 65, 35, 75, 50, 85, 45, 70, 30, 88, 60, 40, 75].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: `rgba(255,255,255,${h/100})`, borderRadius: '2px' }}></div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn" style={{ flex: 1, justifyContent: 'center', background: 'white', color: 'var(--teal)', padding: '11px', fontSize: '13px', border: 'none', borderRadius: 'var(--r-sm)', fontFamily: "'Syne',sans-serif", fontWeight: 800, cursor: 'pointer' }}>⏺ Record</button>
                  <button className="btn" style={{ flex: 1, justifyContent: 'center', background: 'rgba(255,255,255,0.2)', color: 'white', padding: '11px', fontSize: '13px', border: 'none', borderRadius: 'var(--r-sm)', fontFamily: "'Syne',sans-serif", fontWeight: 700, cursor: 'pointer' }}>⏸ Pause</button>
                  <button className="btn" style={{ flex: 1, justifyContent: 'center', background: 'rgba(255,255,255,0.2)', color: 'white', padding: '11px', fontSize: '13px', border: 'none', borderRadius: 'var(--r-sm)', fontFamily: "'Syne',sans-serif", fontWeight: 700, cursor: 'pointer' }}>📊 Analyse</button>
                </div>
              </div>
              <div className="card">
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '13px', fontWeight: 800, marginBottom: '12px' }}>📝 Practice Topics</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ padding: '10px 12px', background: 'var(--teal-bg)', borderRadius: '8px', border: '1px solid var(--teal-mid)', fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>"Tell me about yourself"</span><span className="chip teal" style={{ fontSize: '10px' }}>Easy</span></div>
                  <div style={{ padding: '10px 12px', background: 'var(--amber-bg)', borderRadius: '8px', border: '1px solid var(--amber-mid)', fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>"Why should we hire you?"</span><span className="chip amber" style={{ fontSize: '10px' }}>Medium</span></div>
                  <div style={{ padding: '10px 12px', background: 'var(--red-bg)', borderRadius: '8px', border: '1px solid var(--red-mid)', fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>"Describe a failure & what you learned"</span><span className="chip red" style={{ fontSize: '10px' }}>Hard</span></div>
                </div>
              </div>
            </div>
            <div>
              <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '16px' }}>📊 Vocal Analysis Report</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--teal-bg)', border: '1.5px solid var(--teal-mid)', borderRadius: 'var(--r-sm)', padding: '14px', textAlign: 'center' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--teal)' }}>82%</div><div style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '2px' }}>Clarity</div></div>
                  <div style={{ background: 'var(--violet-bg)', border: '1.5px solid var(--violet-mid)', borderRadius: 'var(--r-sm)', padding: '14px', textAlign: 'center' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--violet)' }}>74%</div><div style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '2px' }}>Confidence</div></div>
                  <div style={{ background: 'var(--blue-bg)', border: '1.5px solid var(--blue-mid)', borderRadius: 'var(--r-sm)', padding: '14px', textAlign: 'center' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--blue)' }}>138 <span style={{ fontSize: '13px' }}>wpm</span></div><div style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '2px' }}>Speaking Pace</div></div>
                  <div style={{ background: 'var(--amber-bg)', border: '1.5px solid var(--amber-mid)', borderRadius: 'var(--r-sm)', padding: '14px', textAlign: 'center' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--amber)' }}>4.2</div><div style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '2px' }}>Filler Words/min</div></div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div className="progress-head"><span style={{ fontSize: '12px' }}>Pronunciation Accuracy</span><span className="progress-pct" style={{ color: 'var(--teal)' }}>88%</span></div>
                  <div className="progress-track" style={{ height: '7px' }}><div className="progress-fill pf-teal" style={{ width: '88%' }}></div></div>
                </div>
                <div>
                  <div className="progress-head"><span style={{ fontSize: '12px' }}>Tone Modulation</span><span className="progress-pct" style={{ color: 'var(--violet)' }}>65%</span></div>
                  <div className="progress-track" style={{ height: '7px' }}><div className="progress-fill pf-violet" style={{ width: '65%' }}></div></div>
                </div>
              </div>
              <div className="ai-card">
                <div className="ai-card-title">🤖 Vocal AI Recommendations</div>
                <div className="ai-insight"><span className="ai-arrow">→</span>Reduce filler words ("um", "uh") — detected 4.2/min. Target below 1.5/min.</div>
                <div className="ai-insight"><span className="ai-arrow">→</span>Speaking pace is slightly fast at 138 wpm. Slow to 110-120 wpm for better clarity.</div>
                <div className="ai-insight" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}><span className="ai-arrow">→</span>Tone modulation (65%) needs improvement — vary your pitch more for engagement.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
