export default function JobsPage() {
  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="section-head mb-20">
        <div className="section-title">💼 AI-Matched Job Listings</div>
        <span className="chip violet">🤖 AI Matched</span>
      </div>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div className="card card-hover" style={{ borderColor: 'var(--teal-mid)', background: 'linear-gradient(145deg,var(--teal-bg),white)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span className="chip teal">94% Match ⭐</span><span className="text-xs text-muted">2h ago</span></div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '17px', fontWeight: 800, marginBottom: '3px' }}>Senior Python Developer</div>
          <div className="text-sm text-muted mb-20">TechCorp Inc. · Remote · ₹18-24 LPA</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}><span className="collab-tag">Python</span><span className="collab-tag">FastAPI</span><span className="collab-tag">Remote</span></div>
          <button className="btn btn-teal btn-full" style={{ padding: '11px' }}>Apply Now →</button>
        </div>
        <div className="card card-hover" style={{ borderColor: 'var(--amber-mid)', background: 'linear-gradient(145deg,var(--amber-bg),white)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span className="chip amber">78% Match</span><span className="text-xs text-muted">1d ago</span></div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '17px', fontWeight: 800, marginBottom: '3px' }}>ML Engineer Intern</div>
          <div className="text-sm text-muted mb-20">AI Startup · Bangalore · ₹35k/month</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}><span className="collab-tag">Python</span><span className="collab-tag">PyTorch</span><span className="collab-tag">MLOps</span></div>
          <button className="btn btn-ghost btn-full" style={{ padding: '11px' }}>View Details</button>
        </div>
        <div className="card card-hover" style={{ borderColor: 'var(--violet-mid)', background: 'linear-gradient(145deg,var(--violet-bg),white)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span className="chip violet">65% Match</span><span className="text-xs text-muted">2d ago</span></div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '17px', fontWeight: 800, marginBottom: '3px' }}>Full Stack Developer</div>
          <div className="text-sm text-muted mb-20">Product Co. · Hybrid · ₹12-16 LPA</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}><span className="collab-tag">React</span><span className="collab-tag">Node.js</span><span className="collab-tag">MongoDB</span></div>
          <button className="btn btn-ghost btn-full" style={{ padding: '11px' }}>View Details</button>
        </div>
        <div className="card" style={{ background: 'linear-gradient(145deg,var(--blue-bg),white)', borderColor: 'var(--blue-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px', minHeight: '180px', cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: '32px' }}>🚀</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '14px', fontWeight: 800, color: 'var(--blue)' }}>Boost score to unlock more matches</div>
          <button className="btn btn-blue" style={{ padding: '9px 18px', fontSize: '12px' }}>Improve Score →</button>
        </div>
      </div>
    </div>
  )
}
