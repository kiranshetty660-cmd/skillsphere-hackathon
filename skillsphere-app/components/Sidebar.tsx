'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo">
          <span className="logo-skill">Skill</span>
          <span className="logo-sphere">Sphere</span>
          <span className="logo-dot">.</span>
        </div>
        <div className="logo-sub">Skill Development Platform</div>
      </div>

      <div className="user-pill">
        <div className="user-avatar">A</div>
        <div>
          <div className="user-name">Alex Kumar</div>
          <div className="user-score">⚡ Skill Score: 847</div>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Main</div>
        <Link href="/dashboard/home" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/home') ? 'active' : ''}`}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Home Feed <span className="nav-badge">3</span>
          </div>
        </Link>
        <Link href="/dashboard/training" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/training') ? 'active' : ''}`}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            Training
          </div>
        </Link>
        <Link href="/dashboard/testing" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/testing') ? 'active' : ''}`}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            Testing
          </div>
        </Link>
        <Link href="/dashboard/pitchbyte" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/pitchbyte') ? 'active' : ''}`} style={{ position: 'relative' }}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            Pitch Byte
            <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg,var(--pink),var(--violet))', color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '50px', letterSpacing: '0.05em' }}>NEW</span>
          </div>
        </Link>
        <Link href="/dashboard/performance" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/performance') ? 'active' : ''}`}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Performance
          </div>
        </Link>
      </div>

      <div className="nav-section">
        <div className="nav-label">Social</div>
        <Link href="/dashboard/community" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/community') ? 'active' : ''}`}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            Community
          </div>
        </Link>
        <Link href="/dashboard/collaborate" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/collaborate') ? 'active' : ''}`}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Collaborate
          </div>
        </Link>
        <Link href="/dashboard/jobs" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/jobs') ? 'active' : ''}`}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
            Pitch & Jobs
          </div>
        </Link>
      </div>

      <div className="nav-section">
        <div className="nav-label">Achievements</div>
        <Link href="/dashboard/certifications" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/dashboard/certifications') ? 'active' : ''}`}>
            <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
            Certifications
          </div>
        </Link>
      </div>

      <div className="streak-card">
        <div className="streak-title">🔥 Learning Streak</div>
        <div className="streak-val">12 <span style={{ fontSize: '18px' }}>days</span></div>
        <div className="streak-sub">Keep it up! Best: 21 days</div>
      </div>
    </aside>
  )
}
