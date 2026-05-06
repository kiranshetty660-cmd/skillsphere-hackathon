export default function CommunityPage() {
  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="community-layout">
        <div>
          <div className="section-head mb-16">
            <div className="section-title">👥 Community Feed</div>
            <button className="btn btn-violet" style={{ padding: '9px 16px', fontSize: '12px' }}>+ New Post</button>
          </div>
          <div className="comm-post">
            <div className="comm-user-row">
              <div className="comm-avatar" style={{ background: 'linear-gradient(135deg,var(--violet),#a78bfa)' }}>P</div>
              <div><div className="comm-name">Priya Kumar</div><div className="comm-role">Python Developer · Top Contributor</div></div>
              <div className="comm-time">2h ago</div>
              <span className="chip violet" style={{ marginLeft: '8px' }}>Blog</span>
            </div>
            <p className="comm-body">Just published my FAANG prep guide — 60 days, 3 offers. Arrays, Trees, DP, System Design, behaviorals. Full daily schedule inside. Link in bio! 🚀</p>
            <div className="comm-actions"><span className="comm-action">❤️ 248</span><span className="comm-action">💬 42</span><span className="comm-action">🔗 Share</span><span className="comm-action connect">Follow Priya →</span></div>
          </div>
          <div className="comm-post">
            <div className="comm-user-row">
              <div className="comm-avatar" style={{ background: 'linear-gradient(135deg,var(--teal),#34d399)' }}>R</div>
              <div><div className="comm-name">Rahul Mehta</div><div className="comm-role">Backend Engineer · Startup Founder</div></div>
              <div className="comm-time">5h ago</div>
              <span className="chip teal" style={{ marginLeft: '8px' }}>Collab</span>
            </div>
            <p className="comm-body">Building an AI-powered resume scanner. Need React + Node.js co-developer. Equity-based. MVP 80% done, launching in 3 weeks. DM me! 🤝</p>
            <div className="comm-actions"><span className="comm-action">❤️ 34</span><span className="comm-action">💬 9</span><span className="comm-action">🔖 Save</span><span className="comm-action connect">Connect →</span></div>
          </div>
          <div className="comm-post">
            <div className="comm-user-row">
              <div className="comm-avatar" style={{ background: 'linear-gradient(135deg,var(--amber),#fbbf24)' }}>S</div>
              <div><div className="comm-name">Sneha Iyer</div><div className="comm-role">Data Scientist · ML Researcher</div></div>
              <div className="comm-time">1d ago</div>
              <span className="chip amber" style={{ marginLeft: '8px' }}>Resource</span>
            </div>
            <p className="comm-body">Free resource drop 🎁 — 50 must-read ML papers in 2025. From transformers to diffusion models. Took me 2 months to compile. Go save it!</p>
            <div className="comm-actions"><span className="comm-action">❤️ 512</span><span className="comm-action">💬 78</span><span className="comm-action">🔖 Save</span><span className="comm-action connect">Get Resources →</span></div>
          </div>
        </div>
        <div>
          <div className="section-head mb-16"><div className="section-title">🏆 Leaderboard</div></div>
          <div className="leaderboard-card">
            <div className="lb-header"><div className="lb-title">🏅 Top Skill Scorers</div><div className="text-xs text-muted" style={{ marginTop: '2px' }}>This month · All fields</div></div>
            <div className="lb-row"><div className="lb-rank gold">1</div><div className="lb-avatar" style={{ background: 'linear-gradient(135deg,#d97706,#fbbf24)' }}>A</div><div className="lb-info"><div className="lb-name">Arjun Singh</div><div className="lb-field">Full Stack</div></div><div className="lb-score">1,240</div></div>
            <div className="lb-row"><div className="lb-rank silver">2</div><div className="lb-avatar" style={{ background: 'linear-gradient(135deg,var(--violet),#a78bfa)' }}>P</div><div className="lb-info"><div className="lb-name">Priya Kumar</div><div className="lb-field">Python</div></div><div className="lb-score">1,180</div></div>
            <div className="lb-row"><div className="lb-rank bronze">3</div><div className="lb-avatar" style={{ background: 'linear-gradient(135deg,var(--teal),#34d399)' }}>R</div><div className="lb-info"><div className="lb-name">Rahul Mehta</div><div className="lb-field">Backend</div></div><div className="lb-score">1,054</div></div>
            <div className="lb-row"><div className="lb-rank">4</div><div className="lb-avatar" style={{ background: 'linear-gradient(135deg,var(--pink),#f472b6)' }}>S</div><div className="lb-info"><div className="lb-name">Sneha Iyer</div><div className="lb-field">ML / AI</div></div><div className="lb-score">988</div></div>
            <div className="lb-row" style={{ background: 'var(--violet-bg)', borderLeft: '3px solid var(--violet)' }}><div className="lb-rank" style={{ color: 'var(--violet)' }}>You</div><div className="lb-avatar" style={{ background: 'linear-gradient(135deg,var(--violet),var(--teal))' }}>A</div><div className="lb-info"><div className="lb-name">Alex Kumar</div><div className="lb-field">Python · DSA</div></div><div className="lb-score">847</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
