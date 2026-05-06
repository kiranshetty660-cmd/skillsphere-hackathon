export default function CollaboratePage() {
  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="grid-2" style={{ gap: '20px' }}>
        <div>
          <div className="section-head mb-16">
            <div className="section-title">🤝 Collaborate</div>
            <button className="btn btn-teal" style={{ padding: '9px 16px', fontSize: '12px' }}>+ Post Request</button>
          </div>
          <div className="collab-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div className="collab-title">AI Resume Scanner — SaaS MVP</div><span className="chip teal">Open</span>
            </div>
            <div className="collab-desc">Need React + Node.js dev. Equity-based. MVP 80% complete. Launch in 3 weeks. GPT-4 powered job matching.</div>
            <div className="collab-tags"><span className="collab-tag">React</span><span className="collab-tag">Node.js</span><span className="collab-tag">OpenAI</span><span className="collab-tag">Equity</span></div>
            <div className="collab-footer"><span>By Rahul Mehta · 5h ago</span><button className="btn btn-teal" style={{ padding: '7px 14px', fontSize: '12px' }}>Connect →</button></div>
          </div>
          <div className="collab-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div className="collab-title">EdTech B2B Skill Assessment Platform</div><span className="chip violet">Seeking</span>
            </div>
            <div className="collab-desc">Need backend engineer (Django/FastAPI) and UI/UX designer. Corporate training for SMBs. Seed round in progress.</div>
            <div className="collab-tags"><span className="collab-tag">Python</span><span className="collab-tag">FastAPI</span><span className="collab-tag">UI/UX</span><span className="collab-tag">B2B</span></div>
            <div className="collab-footer"><span>By Sneha Iyer · 1d ago</span><button className="btn btn-violet" style={{ padding: '7px 14px', fontSize: '12px' }}>Connect →</button></div>
          </div>
        </div>
        <div>
          <div className="section-head mb-16">
            <div className="section-title">💼 Pitch & Jobs</div>
            <span className="section-link">Post a job →</span>
          </div>
          <div className="card card-hover mb-16" style={{ borderColor: 'var(--teal-mid)', background: 'var(--teal-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '15px', fontWeight: 800, marginBottom: '3px' }}>Backend Engineer (Python)</div><div className="text-xs text-muted">TechCorp Inc. · Remote · ₹18-24 LPA</div></div>
              <span className="chip teal">94% Match ⭐</span>
            </div>
            <div className="collab-tags"><span className="collab-tag">Python</span><span className="collab-tag">PostgreSQL</span><span className="collab-tag">Remote</span></div>
            <button className="btn btn-teal btn-full" style={{ padding: '10px', marginTop: '10px' }}>Apply Now →</button>
          </div>
          <div className="card card-hover" style={{ borderColor: 'var(--amber-mid)', background: 'var(--amber-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: '15px', fontWeight: 800, marginBottom: '3px' }}>ML Engineer Intern</div><div className="text-xs text-muted">AI Startup · Bangalore · ₹35k/month</div></div>
              <span className="chip amber">78% Match</span>
            </div>
            <div className="collab-tags"><span className="collab-tag">Python</span><span className="collab-tag">PyTorch</span><span className="collab-tag">MLOps</span></div>
            <button className="btn btn-ghost btn-full" style={{ padding: '10px', marginTop: '10px' }}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}
