export default function CertificationsPage() {
  return (
    <div className="screen active" style={{ display: 'block' }}>
      <div className="section-head mb-20">
        <div className="section-title">🏆 Certifications & Badges</div>
        <span className="section-link">Share to LinkedIn →</span>
      </div>
      <div className="grid-4 mb-24">
        <div className="cert-card earned">
          <div className="cert-icon">🐍</div>
          <div className="cert-name">Python Professional</div>
          <div className="cert-org">SkillSphere · Feb 2025</div>
          <div className="cert-status earned">✓ Earned</div>
          <button className="btn btn-teal" style={{ marginTop: '12px', width: '100%', justifyContent: 'center', padding: '9px', fontSize: '12px' }}>Download PDF</button>
        </div>
        <div className="cert-card earned" style={{ background: 'linear-gradient(145deg,var(--blue-bg),#dbeafe)', borderColor: 'var(--blue-mid)' }}>
          <div className="cert-card" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg,var(--blue),#60a5fa)', borderRadius: 'var(--r) var(--r) 0 0', padding: 0 }}></div>
          <div className="cert-icon">🧮</div>
          <div className="cert-name">DSA Fundamentals</div>
          <div className="cert-org">SkillSphere · Jan 2025</div>
          <div className="cert-status" style={{ color: 'var(--blue)' }}>✓ Earned</div>
          <button className="btn btn-blue" style={{ marginTop: '12px', width: '100%', justifyContent: 'center', padding: '9px', fontSize: '12px' }}>Download PDF</button>
        </div>
        <div className="cert-card earned" style={{ background: 'linear-gradient(145deg,var(--violet-bg),var(--violet-mid))', borderColor: 'var(--violet-mid)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg,var(--violet),#a78bfa)', borderRadius: 'var(--r) var(--r) 0 0' }}></div>
          <div className="cert-icon">🎯</div>
          <div className="cert-name">Aptitude Expert</div>
          <div className="cert-org">SkillSphere · Dec 2024</div>
          <div className="cert-status" style={{ color: 'var(--violet)' }}>✓ Earned</div>
          <button className="btn btn-violet" style={{ marginTop: '12px', width: '100%', justifyContent: 'center', padding: '9px', fontSize: '12px' }}>Download PDF</button>
        </div>
        <div className="cert-card pending">
          <div className="cert-icon">☕</div>
          <div className="cert-name">Java Developer</div>
          <div className="cert-org">SkillSphere · In Progress</div>
          <div className="progress-track" style={{ margin: '10px 0', background: 'var(--amber-mid)' }}><div className="progress-fill pf-amber" style={{ width: '30%' }}></div></div>
          <div className="cert-status pending">⏳ 30% — Keep going!</div>
        </div>
        <div className="cert-card locked"><div className="cert-icon" style={{ filter: 'grayscale(1)', opacity: 0.4 }}>🌐</div><div className="cert-name" style={{ color: 'var(--text2)' }}>System Design Pro</div><div className="cert-org">SkillSphere</div><div className="cert-status locked">🔒 Score 60%+ to unlock</div></div>
        <div className="cert-card locked"><div className="cert-icon" style={{ filter: 'grayscale(1)', opacity: 0.4 }}>🤖</div><div className="cert-name" style={{ color: 'var(--text2)' }}>AI/ML Engineer</div><div className="cert-org">SkillSphere</div><div className="cert-status locked">🔒 Complete ML track</div></div>
        <div className="cert-card locked"><div className="cert-icon" style={{ filter: 'grayscale(1)', opacity: 0.4 }}>🦫</div><div className="cert-name" style={{ color: 'var(--text2)' }}>Golang Expert</div><div className="cert-org">SkillSphere</div><div className="cert-status locked">🔒 Complete Golang track</div></div>
        <div className="cert-card locked"><div className="cert-icon" style={{ filter: 'grayscale(1)', opacity: 0.4 }}>👑</div><div className="cert-name" style={{ color: 'var(--text2)' }}>Top 10% Global</div><div className="cert-org">SkillSphere</div><div className="cert-status locked">🔒 Reach Top 10%</div></div>
      </div>

      <div className="section-head mb-16"><div className="section-title">🎖️ Achievement Badges</div></div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ background: 'linear-gradient(145deg,var(--orange-bg),var(--orange-mid))', border: '1.5px solid var(--orange-mid)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', minWidth: '100px', boxShadow: 'var(--shadow)' }}><div style={{ fontSize: '28px', marginBottom: '6px' }}>🔥</div><div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)' }}>12-Day Streak</div></div>
        <div style={{ background: 'linear-gradient(145deg,var(--violet-bg),var(--violet-mid))', border: '1.5px solid var(--violet-mid)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', minWidth: '100px', boxShadow: 'var(--shadow)' }}><div style={{ fontSize: '28px', marginBottom: '6px' }}>⭐</div><div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--violet)' }}>Top 15%</div></div>
        <div style={{ background: 'linear-gradient(145deg,var(--teal-bg),var(--teal-mid))', border: '1.5px solid var(--teal-mid)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', minWidth: '100px', boxShadow: 'var(--shadow)' }}><div style={{ fontSize: '28px', marginBottom: '6px' }}>🚀</div><div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--teal)' }}>Early Adopter</div></div>
        <div style={{ background: 'linear-gradient(145deg,var(--blue-bg),var(--blue-mid))', border: '1.5px solid var(--blue-mid)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', minWidth: '100px', boxShadow: 'var(--shadow)' }}><div style={{ fontSize: '28px', marginBottom: '6px' }}>🧠</div><div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)' }}>Problem Solver</div></div>
        <div style={{ background: 'var(--bg2)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', minWidth: '100px', opacity: 0.5 }}><div style={{ fontSize: '28px', marginBottom: '6px' }}>👑</div><div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text3)' }}>Top 10%</div></div>
        <div style={{ background: 'var(--bg2)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', minWidth: '100px', opacity: 0.5 }}><div style={{ fontSize: '28px', marginBottom: '6px' }}>💎</div><div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text3)' }}>Elite Coder</div></div>
      </div>
    </div>
  )
}
