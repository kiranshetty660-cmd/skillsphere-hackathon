import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { Search, Bell, Moon, Sun, Check } from 'lucide-react';

export default function Topbar() {
  const { screen, theme, toggleTheme, unreadCount, notifications, markAllRead } = useUserStore();
  const [showNotifs, setShowNotifs] = useState(false);

  const screenTitles: Record<string, string> = {
    home: 'Home Feed',
    training: 'Training',
    testing: 'Testing',
    pitchbyte: 'Pitch Byte',
    performance: 'Performance Overview',
    community: 'Community',
    collaborate: 'Collaborate',
    jobs: 'Pitch & Jobs',
    certifications: 'Certifications',
  };

  const handleNotifClick = () => {
    setShowNotifs(!showNotifs);
    if (!showNotifs && unreadCount > 0) {
      markAllRead();
    }
  };

  return (
    <div className="topbar">
      <div className="page-title">{screenTitles[screen] || 'SkillSphere'}</div>
      
      <div className="search-wrap">
        <Search className="search-icon" size={15} />
        <input className="search-input" placeholder="Search courses, people, posts..." />
      </div>
      
      <div className="topbar-actions" style={{position: 'relative'}}>
        <div className="icon-btn" onClick={handleNotifClick}>
          <Bell size={17} />
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>
        
        {showNotifs && (
          <div style={{position: 'absolute', top: '45px', right: '80px', width: '320px', background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', padding: '16px', boxShadow: 'var(--shadow-lg)', zIndex: 100}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
              <h3 style={{fontSize: '14px', fontFamily: 'Syne', fontWeight: 800}}>Notifications</h3>
              <Check size={14} color="var(--text2)" style={{cursor: 'pointer'}} onClick={markAllRead} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto'}}>
              {notifications.length === 0 ? (
                <div style={{fontSize: '12px', color: 'var(--text3)', textAlign: 'center', padding: '20px 0'}}>No notifications yet.</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} style={{padding: '12px', background: 'var(--bg2)', borderRadius: '8px', fontSize: '12px'}}>
                    <div style={{fontWeight: 700, marginBottom: '4px'}}>{n.title}</div>
                    <div style={{color: 'var(--text2)', lineHeight: 1.4}}>{n.body}</div>
                    <div style={{fontSize: '10px', color: 'var(--text3)', marginTop: '6px'}}>{new Date(n.createdAt).toLocaleTimeString()}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
        </div>
        <div className="icon-btn" style={{borderRadius: '50%', background: 'var(--violet-bg)', color: 'var(--violet)'}}>
          <span style={{fontSize: '12px', fontWeight: 800}}>A</span>
        </div>
      </div>
    </div>
  );
}
