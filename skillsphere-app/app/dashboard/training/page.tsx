'use client'

import { useState } from 'react'

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState('programming')

  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="tabs-wrap" id="training-tabs">
        <div className={`tab ${activeTab === 'programming' ? 'active' : ''}`} onClick={() => setActiveTab('programming')}>💻 Programming</div>
        <div className={`tab ${activeTab === 'codezone' ? 'active' : ''}`} onClick={() => setActiveTab('codezone')}>⌨️ CodeZone</div>
        <div className={`tab ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>📋 Assignments</div>
        <div className={`tab ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>📝 Blogs</div>
        <div className={`tab ${activeTab === 'plugins' ? 'active' : ''}`} onClick={() => setActiveTab('plugins')}>🔌 Plug-ins</div>
        <div className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>🚀 Projects</div>
      </div>

      {activeTab === 'programming' && (
        <div id="ttab-programming">
          <div className="section-head mb-16">
            <div className="section-title">Available Languages & Courses</div>
            <button className="btn btn-violet" style={{ padding: '9px 16px', fontSize: '12px' }}>+ Enroll New</button>
          </div>
          <div className="grid-4 mb-24">
            <div className="course-card c-violet">
              <div className="course-emoji">🐍</div>
              <div className="course-name">Python</div>
              <div className="course-meta">Intermediate · 24 modules · 18h</div>
              <div className="progress-track"><div className="progress-fill pf-violet" style={{ width: '62%' }}></div></div>
              <div className="course-footer"><span className="text-muted">62% done</span><span className="chip violet" style={{ fontSize: '10px' }}>Active</span></div>
            </div>
            <div className="course-card c-blue">
              <div className="course-emoji">☕</div>
              <div className="course-name">Java</div>
              <div className="course-meta">Beginner · 18 modules · 14h</div>
              <div className="progress-track"><div className="progress-fill pf-blue" style={{ width: '30%' }}></div></div>
              <div className="course-footer"><span className="text-muted">30% done</span><span className="chip blue" style={{ fontSize: '10px' }}>Active</span></div>
            </div>
            <div className="course-card c-teal">
              <div className="course-emoji">🦫</div>
              <div className="course-name">Golang</div>
              <div className="course-meta">Advanced · 20 modules · 22h</div>
              <div className="progress-track"><div className="progress-fill pf-teal" style={{ width: '10%' }}></div></div>
              <div className="course-footer"><span className="text-muted">10% done</span><span className="chip teal" style={{ fontSize: '10px' }}>New</span></div>
            </div>
            <div className="course-card c-orange">
              <div className="course-emoji">⚙️</div>
              <div className="course-name">C / C++</div>
              <div className="course-meta">Beginner · 14 modules · 10h</div>
              <div className="progress-track" style={{ background: '#fed7aa' }}><div className="progress-fill pf-orange" style={{ width: '0%' }}></div></div>
              <div className="course-footer"><span className="text-muted">Not started</span><span className="chip orange" style={{ fontSize: '10px' }}>Start</span></div>
            </div>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            <div className="card">
              <div className="section-title" style={{ marginBottom: '14px' }}>📈 Learning Roadmap</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: 'var(--green-bg)', borderRadius: '10px', border: '1.5px solid var(--green-mid)' }}><div style={{ fontSize: '16px' }}>✅</div><div><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green)' }}>Variables, Data Types, Loops</div><div className="text-xs text-muted">Completed</div></div></div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: 'var(--violet-bg)', borderRadius: '10px', border: '1.5px solid var(--violet-mid)' }}><div style={{ fontSize: '16px' }}>🔄</div><div><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--violet)' }}>Functions & OOP</div><div className="text-xs text-muted">In Progress · 62%</div></div></div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: 'var(--bg)', borderRadius: '10px', border: '1.5px solid var(--border)', opacity: 0.6 }}><div style={{ fontSize: '16px' }}>🔒</div><div><div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text2)' }}>File Handling & APIs</div><div className="text-xs text-muted">Locked</div></div></div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: 'var(--bg)', borderRadius: '10px', border: '1.5px solid var(--border)', opacity: 0.6 }}><div style={{ fontSize: '16px' }}>🔒</div><div><div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text2)' }}>Advanced Python & Frameworks</div><div className="text-xs text-muted">Locked</div></div></div>
              </div>
            </div>
            <div className="ai-card">
              <div className="ai-card-title">🤖 AI Course Recommendations</div>
              <div className="ai-insight"><span className="ai-arrow">→</span>Complete Python OOP module — it unlocks Django & Flask frameworks.</div>
              <div className="ai-insight"><span className="ai-arrow">→</span>Java is 30% done — 4 more modules to unlock Java Certification.</div>
              <div className="ai-insight" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}><span className="ai-arrow">→</span>Try C fundamentals to strengthen your DSA problem-solving base.</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'codezone' && (
        <div id="ttab-codezone">
          <div className="section-head mb-16">
            <div className="section-title">⌨️ CodeZone — Live Coding Environment</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="chip teal">Daily Streak: 12🔥</span>
              <span className="chip violet">342 Problems Solved</span>
            </div>
          </div>
          <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
            <div>
              <div className="codezone-editor" style={{ marginBottom: '14px' }}>
                <div className="editor-topbar">
                  <div className="editor-dot" style={{ background: '#ff6b6b' }}></div>
                  <div className="editor-dot" style={{ background: '#fbbf24' }}></div>
                  <div className="editor-dot" style={{ background: '#34d399' }}></div>
                  <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '8px' }}>solution.py</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#6b7280', background: '#2d3748', padding: '2px 8px', borderRadius: '4px' }}>Python 3.11</span>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>▶ Run</span>
                  </div>
                </div>
                <div className="editor-code">
                  <span className="code-gray"># Two Sum — LeetCode #1</span><br/>
                  <span className="code-purple">def</span> <span className="code-teal">twoSum</span>(nums, target):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;seen = {'{}'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-purple">for</span> i, num <span className="code-purple">in</span> <span className="code-teal">enumerate</span>(nums):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;diff = target - num<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-purple">if</span> diff <span className="code-purple">in</span> seen:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-purple">return</span> [seen[diff], i]<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seen[num] = i<br/>
                  <span className="code-gray"># Time: O(n) · Space: O(n)</span>
                </div>
              </div>
              <div style={{ background: '#1e2432', borderRadius: 'var(--r-sm)', padding: '14px' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px' }}>OUTPUT</div>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: '13px', color: '#86efac' }}>✓ Test case 1 passed: [0, 1]</div>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: '13px', color: '#86efac' }}>✓ Test case 2 passed: [1, 2]</div>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: '13px', color: '#fde68a', marginTop: '4px' }}>Runtime: 52ms · Memory: 14.2MB</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="card">
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>🎯 Problem Categories</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '6px 12px', background: 'var(--violet-bg)', border: '1.5px solid var(--violet-mid)', borderRadius: '50px', fontSize: '12px', fontWeight: 600, color: 'var(--violet)', cursor: 'pointer' }}>Arrays (48)</span>
                  <span style={{ padding: '6px 12px', background: 'var(--teal-bg)', border: '1.5px solid var(--teal-mid)', borderRadius: '50px', fontSize: '12px', fontWeight: 600, color: 'var(--teal)', cursor: 'pointer' }}>Trees (32)</span>
                  <span style={{ padding: '6px 12px', background: 'var(--blue-bg)', border: '1.5px solid var(--blue-mid)', borderRadius: '50px', fontSize: '12px', fontWeight: 600, color: 'var(--blue)', cursor: 'pointer' }}>Graphs (28)</span>
                  <span style={{ padding: '6px 12px', background: 'var(--amber-bg)', border: '1.5px solid var(--amber-mid)', borderRadius: '50px', fontSize: '12px', fontWeight: 600, color: 'var(--amber)', cursor: 'pointer' }}>DP (40)</span>
                  <span style={{ padding: '6px 12px', background: 'var(--pink-bg)', border: '1.5px solid var(--pink-mid)', borderRadius: '50px', fontSize: '12px', fontWeight: 600, color: 'var(--pink)', cursor: 'pointer' }}>Strings (25)</span>
                  <span style={{ padding: '6px 12px', background: 'var(--orange-bg)', border: '1.5px solid var(--orange-mid)', borderRadius: '50px', fontSize: '12px', fontWeight: 600, color: 'var(--orange)', cursor: 'pointer' }}>Sorting (18)</span>
                </div>
              </div>
              <div className="card">
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>🏆 Today's Challenges</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ padding: '11px', background: 'var(--teal-bg)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--teal-mid)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><div style={{ fontSize: '13px', fontWeight: 700 }}>Two Sum</div><div className="text-xs text-muted">Arrays · Hash Maps · 47% accept</div></div><span className="chip teal">Easy</span>
                  </div>
                  <div style={{ padding: '11px', background: 'var(--amber-bg)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--amber-mid)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><div style={{ fontSize: '13px', fontWeight: 700 }}>LRU Cache</div><div className="text-xs text-muted">Design · Linked List · 41% accept</div></div><span className="chip amber">Medium</span>
                  </div>
                  <div style={{ padding: '11px', background: 'var(--red-bg)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--red-mid)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><div style={{ fontSize: '13px', fontWeight: 700 }}>Word Ladder II</div><div className="text-xs text-muted">BFS · Graph · 29% accept</div></div><span className="chip red">Hard</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: 'var(--green-bg)', border: '1.5px solid var(--green-mid)', borderRadius: 'var(--r-sm)', padding: '12px', textAlign: 'center' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--green)' }}>342</div><div style={{ fontSize: '11px', color: 'var(--text2)' }}>Solved</div></div>
                <div style={{ background: 'var(--violet-bg)', border: '1.5px solid var(--violet-mid)', borderRadius: 'var(--r-sm)', padding: '12px', textAlign: 'center' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--violet)' }}>#78</div><div style={{ fontSize: '11px', color: 'var(--text2)' }}>Global Rank</div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div id="ttab-assignments">
          <div className="section-head mb-16">
            <div className="section-title">📋 Assignments</div>
            <div style={{ display: 'flex', gap: '8px' }}><span className="chip amber">3 Due Soon</span><span className="chip green">5 Submitted</span></div>
          </div>
          <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'linear-gradient(145deg,var(--red-bg),#fee2e2)', border: '1.5px solid var(--red-mid)', borderRadius: 'var(--r)', padding: '18px', boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800 }}>Build a REST API with FastAPI</div><span className="chip red">Due Today</span></div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '12px', lineHeight: '1.5' }}>Create CRUD endpoints for a user management system with JWT authentication.</div>
                <div style={{ display: 'flex', gap: '8px' }}><span className="chip violet">Python</span><span className="chip blue">FastAPI</span><span className="chip teal">JWT</span></div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}><button className="btn btn-violet" style={{ padding: '8px 14px', fontSize: '12px' }}>Submit</button><button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: '12px' }}>View Brief</button></div>
              </div>
              <div style={{ background: 'linear-gradient(145deg,var(--amber-bg),#fef3c7)', border: '1.5px solid var(--amber-mid)', borderRadius: 'var(--r)', padding: '18px', boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800 }}>Binary Tree Traversal Problems</div><span className="chip amber">Due Mar 2</span></div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '12px', lineHeight: '1.5' }}>Implement inorder, preorder, postorder traversal with iterative solutions.</div>
                <div style={{ display: 'flex', gap: '8px' }}><span className="chip teal">DSA</span><span className="chip blue">Trees</span></div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}><button className="btn btn-violet" style={{ padding: '8px 14px', fontSize: '12px' }}>Submit</button><button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: '12px' }}>View Brief</button></div>
              </div>
              <div style={{ background: 'linear-gradient(145deg,var(--blue-bg),var(--blue-mid))', border: '1.5px solid var(--blue-mid)', borderRadius: 'var(--r)', padding: '18px', boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800 }}>Design a URL Shortener</div><span className="chip blue">Due Mar 5</span></div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '12px', lineHeight: '1.5' }}>System design assignment — handle 1M requests/day with Redis caching.</div>
                <div style={{ display: 'flex', gap: '8px' }}><span className="chip indigo">System Design</span><span className="chip teal">Redis</span></div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}><button className="btn btn-violet" style={{ padding: '8px 14px', fontSize: '12px' }}>Submit</button><button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: '12px' }}>View Brief</button></div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="card">
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '14px' }}>✅ Submitted Assignments</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--green-bg)', borderRadius: '8px', border: '1px solid var(--green-mid)' }}><span style={{ fontSize: '13px', fontWeight: 600 }}>Python OOP Project</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, color: 'var(--green)' }}>92/100</span><span className="chip green" style={{ fontSize: '10px' }}>Graded</span></div></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--teal-bg)', borderRadius: '8px', border: '1px solid var(--teal-mid)' }}><span style={{ fontSize: '13px', fontWeight: 600 }}>Sorting Algorithms</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, color: 'var(--teal)' }}>88/100</span><span className="chip teal" style={{ fontSize: '10px' }}>Graded</span></div></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--violet-bg)', borderRadius: '8px', border: '1px solid var(--violet-mid)' }}><span style={{ fontSize: '13px', fontWeight: 600 }}>Linked List Problems</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, color: 'var(--violet)' }}>95/100</span><span className="chip violet" style={{ fontSize: '10px' }}>Graded</span></div></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--blue-bg)', borderRadius: '8px', border: '1px solid var(--blue-mid)' }}><span style={{ fontSize: '13px', fontWeight: 600 }}>Hash Map Problems</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, color: 'var(--blue)' }}>79/100</span><span className="chip blue" style={{ fontSize: '10px' }}>Graded</span></div></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--amber-bg)', borderRadius: '8px', border: '1px solid var(--amber-mid)' }}><span style={{ fontSize: '13px', fontWeight: 600 }}>Recursion Practice</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, color: 'var(--amber)' }}>⏳</span><span className="chip amber" style={{ fontSize: '10px' }}>Pending</span></div></div>
                </div>
              </div>
              <div className="ai-card">
                <div className="ai-card-title">🤖 Assignment AI Tips</div>
                <div className="ai-insight"><span className="ai-arrow">→</span>FastAPI assignment is due today — AI can auto-generate boilerplate to get you started.</div>
                <div className="ai-insight" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}><span className="ai-arrow">→</span>Your avg assignment score is 88.5/100 — top 8% of all learners.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'blogs' && (
        <div id="ttab-blogs">
          <div className="section-head mb-16">
            <div className="section-title">📝 Blogs & Articles</div>
            <button className="btn btn-violet" style={{ padding: '9px 16px', fontSize: '12px' }}>✏️ Write Blog</button>
          </div>
          <div className="grid-3" style={{ gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ height: '8px', background: 'linear-gradient(90deg,var(--violet),#a78bfa)' }}></div>
              <div style={{ padding: '18px' }}><span className="chip violet" style={{ marginBottom: '10px', display: 'inline-block' }}>Python</span><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '6px', lineHeight: '1.4' }}>10 Python Tricks Every Developer Should Know in 2025</div><div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '10px', lineHeight: '1.5' }}>From list comprehensions to generators — level up your Python code quality.</div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)' }}><span>by Priya Kumar · 8 min read</span><span>❤️ 248</span></div></div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ height: '8px', background: 'linear-gradient(90deg,var(--blue),#60a5fa)' }}></div>
              <div style={{ padding: '18px' }}><span className="chip blue" style={{ marginBottom: '10px', display: 'inline-block' }}>System Design</span><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '6px', lineHeight: '1.4' }}>How to Design a Scalable URL Shortener from Scratch</div><div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '10px', lineHeight: '1.5' }}>Complete HLD walkthrough — load balancers, databases, caching strategies.</div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)' }}><span>by Rahul Mehta · 12 min read</span><span>❤️ 189</span></div></div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ height: '8px', background: 'linear-gradient(90deg,var(--teal),#34d399)' }}></div>
              <div style={{ padding: '18px' }}><span className="chip teal" style={{ marginBottom: '10px', display: 'inline-block' }}>DSA</span><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '6px', lineHeight: '1.4' }}>Dynamic Programming: From Beginner to Advanced in 30 Days</div><div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '10px', lineHeight: '1.5' }}>The only DP guide you'll ever need — with patterns, templates and 50 problems.</div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)' }}><span>by Sneha Iyer · 15 min read</span><span>❤️ 412</span></div></div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ height: '8px', background: 'linear-gradient(90deg,var(--amber),#fbbf24)' }}></div>
              <div style={{ padding: '18px' }}><span className="chip amber" style={{ marginBottom: '10px', display: 'inline-block' }}>Career</span><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '6px', lineHeight: '1.4' }}>FAANG Interview Prep: My 60-Day Roadmap That Got 3 Offers</div><div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '10px', lineHeight: '1.5' }}>Daily schedule, resources and mental framework that actually works.</div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)' }}><span>by Alex Kumar · 10 min read</span><span>❤️ 623</span></div></div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ height: '8px', background: 'linear-gradient(90deg,var(--pink),#f472b6)' }}></div>
              <div style={{ padding: '18px' }}><span className="chip pink" style={{ marginBottom: '10px', display: 'inline-block' }}>AI/ML</span><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '6px', lineHeight: '1.4' }}>Building Your First LLM App with LangChain + Python</div><div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '10px', lineHeight: '1.5' }}>Step-by-step tutorial to build a RAG chatbot from scratch.</div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)' }}><span>by Sneha Iyer · 18 min read</span><span>❤️ 534</span></div></div>
            </div>
            <div style={{ background: 'linear-gradient(145deg,var(--indigo-bg),var(--indigo-mid))', border: '1.5px solid var(--indigo-mid)', borderRadius: 'var(--r)', padding: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', boxShadow: 'var(--shadow)' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✏️</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, color: 'var(--indigo)', marginBottom: '6px' }}>Write Your First Blog</div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '12px' }}>Share your knowledge with 50,000+ learners</div>
              <button className="btn" style={{ background: 'var(--indigo)', color: 'white', padding: '8px 16px', fontSize: '12px', border: 'none', borderRadius: 'var(--r-sm)', fontFamily: "'Syne',sans-serif", fontWeight: 700, cursor: 'pointer' }}>Start Writing →</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'plugins' && (
        <div id="ttab-plugins">
          <div className="section-head mb-16">
            <div className="section-title">🔌 Plug-ins & Integrations</div>
            <span className="chip violet">12 Available · 3 Active</span>
          </div>
          <div className="grid-3" style={{ gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--green-mid)', backgroundColor: 'var(--green-bg)', borderRadius: 'var(--r)', padding: '20px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}><div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>🐙</div><div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800 }}>GitHub</div><div style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 600 }}>✓ Connected</div></div></div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '12px', lineHeight: '1.5' }}>Sync your code submissions directly to GitHub repositories and track commits.</div>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '12px' }}>Manage</button>
            </div>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--blue-mid)', backgroundColor: 'var(--blue-bg)', borderRadius: 'var(--r)', padding: '20px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}><div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>🔵</div><div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800 }}>VS Code</div><div style={{ fontSize: '11px', color: 'var(--blue)', fontWeight: 600 }}>✓ Connected</div></div></div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '12px', lineHeight: '1.5' }}>Code directly in VS Code and sync with SkillSphere's problem set in real-time.</div>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '12px' }}>Manage</button>
            </div>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--violet-mid)', backgroundColor: 'var(--violet-bg)', borderRadius: 'var(--r)', padding: '20px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}><div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>📊</div><div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800 }}>Notion</div><div style={{ fontSize: '11px', color: 'var(--violet)', fontWeight: 600 }}>✓ Connected</div></div></div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '12px', lineHeight: '1.5' }}>Export your learning notes, progress reports and study plans to Notion.</div>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '12px' }}>Manage</button>
            </div>
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', padding: '20px', boxShadow: 'var(--shadow)', opacity: 0.7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}><div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>💼</div><div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800 }}>LinkedIn</div><div style={{ fontSize: '11px', color: 'var(--text3)' }}>Not Connected</div></div></div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '12px', lineHeight: '1.5' }}>Auto-share certifications and achievements to your LinkedIn profile.</div>
              <button className="btn btn-violet" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '12px' }}>Connect</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div id="ttab-projects">
          <div className="section-head mb-16">
            <div className="section-title">🚀 Real-World Projects</div>
            <button className="btn btn-violet" style={{ padding: '9px 16px', fontSize: '12px' }}>+ New Project</button>
          </div>
          <div className="grid-2" style={{ gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: 'linear-gradient(145deg,var(--violet-bg),var(--violet-mid))', border: '1.5px solid var(--violet-mid)', borderRadius: 'var(--r)', padding: '22px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '16px', fontWeight: 800 }}>🛒 E-Commerce REST API</div><span className="chip violet">In Progress</span></div>
              <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '14px', lineHeight: '1.6' }}>Full-stack project — FastAPI backend, PostgreSQL DB, Redis caching, Docker deployment.</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}><span style={{ background: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 600, color: 'var(--violet)' }}>Python</span><span style={{ background: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 600, color: 'var(--violet)' }}>FastAPI</span></div>
              <div className="progress-track" style={{ height: '8px', marginBottom: '8px' }}><div className="progress-fill pf-violet" style={{ width: '65%' }}></div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text2)' }}><span>65% complete</span><button className="btn btn-violet" style={{ padding: '6px 12px', fontSize: '11px' }}>Continue →</button></div>
            </div>
            <div style={{ background: 'linear-gradient(145deg,var(--teal-bg),var(--teal-mid))', border: '1.5px solid var(--teal-mid)', borderRadius: 'var(--r)', padding: '22px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '16px', fontWeight: 800 }}>💬 Real-Time Chat App</div><span className="chip teal">Completed</span></div>
              <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '14px', lineHeight: '1.6' }}>WebSocket-based chat with rooms, online presence, message history and file sharing.</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}><span style={{ background: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 600, color: 'var(--teal)' }}>Node.js</span></div>
              <div className="progress-track" style={{ height: '8px', marginBottom: '8px' }}><div className="progress-fill pf-teal" style={{ width: '100%' }}></div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text2)' }}><span>100% complete ✓</span><button className="btn btn-teal" style={{ padding: '6px 12px', fontSize: '11px' }}>View on GitHub →</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
