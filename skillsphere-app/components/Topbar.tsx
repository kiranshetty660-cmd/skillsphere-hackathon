'use client'

import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard/home': 'Home Feed',
  '/dashboard/training': 'Training Zone',
  '/dashboard/testing': 'Testing System',
  '/dashboard/pitchbyte': 'Pitch Byte — Communication Lab',
  '/dashboard/performance': 'Performance Analyser',
  '/dashboard/community': 'Community',
  '/dashboard/collaborate': 'Collaborate & Pitch',
  '/dashboard/jobs': 'Pitch & Jobs',
  '/dashboard/certifications': 'Certifications'
}

export default function Topbar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'Dashboard'

  return (
    <div className="topbar">
      <div className="page-title">{title}</div>
      <div className="search-wrap">
        <svg className="search-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input className="search-input" placeholder="Search courses, people, posts..." />
      </div>
      <div className="topbar-actions">
        <div className="icon-btn">
          <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          <span className="badge">3</span>
        </div>
        <div className="icon-btn">
          <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
        </div>
      </div>
    </div>
  )
}
