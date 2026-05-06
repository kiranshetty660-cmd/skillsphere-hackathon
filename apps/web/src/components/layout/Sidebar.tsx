import React from 'react';
import { useUserStore } from '@/stores/userStore';
import { Home, Play, PenTool, LayoutTemplate, Activity, Users, Share2, Briefcase, Award } from 'lucide-react';

const mainNav = [
  { id: 'home', label: 'Home Feed', icon: Home, badge: 3 },
  { id: 'training', label: 'Training', icon: Play },
  { id: 'testing', label: 'Testing', icon: PenTool },
  { id: 'pitchbyte', label: 'Pitch Byte', icon: LayoutTemplate, isNew: true },
  { id: 'performance', label: 'Performance', icon: Activity },
];

const socialNav = [
  { id: 'community', label: 'Community', icon: Users },
  { id: 'collaborate', label: 'Collaborate', icon: Share2 },
  { id: 'jobs', label: 'Pitch & Jobs', icon: Briefcase },
];

const achieveNav = [
  { id: 'certifications', label: 'Certifications', icon: Award },
];

export default function Sidebar() {
  const { user, screen, setScreen } = useUserStore();

  const renderNavItem = (item: any) => {
    const Icon = item.icon;
    const isActive = screen === item.id;
    return (
      <div 
        key={item.id}
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={() => setScreen(item.id as any)}
      >
        <Icon className="nav-icon" size={17} />
        {item.label}
        {item.badge && <span className="nav-badge">{item.badge}</span>}
        {item.isNew && (
          <span style={{position:'absolute',right:'8px',top:'50%',transform:'translateY(-50%)',background:'linear-gradient(135deg,var(--pink),var(--violet))',color:'white',fontSize:'9px',fontWeight:800,padding:'2px 6px',borderRadius:'50px',letterSpacing:'0.05em'}}>NEW</span>
        )}
      </div>
    );
  };

  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo">
          <span className="logo-skill">Skill</span><span className="logo-sphere">Sphere</span><span className="logo-dot">.</span>
        </div>
        <div className="logo-sub">Skill Development Platform</div>
      </div>

      <div className="user-pill">
        <div className="user-avatar">{user?.name?.charAt(0) || 'A'}</div>
        <div>
          <div className="user-name">{user?.name || 'Alex Kumar'}</div>
          <div className="user-score">⚡ Skill Score: {user?.skillScore || 847}</div>
        </div>
      </div>

      <div style={{flex: 1, overflowY: 'auto'}}>
        <div className="nav-section">
          <div className="nav-label">Main</div>
          {mainNav.map(renderNavItem)}
        </div>

        <div className="nav-section">
          <div className="nav-label">Social</div>
          {socialNav.map(renderNavItem)}
        </div>

        <div className="nav-section">
          <div className="nav-label">Achievements</div>
          {achieveNav.map(renderNavItem)}
        </div>
      </div>

      <div className="streak-card">
        <div className="streak-title">🔥 Learning Streak</div>
        <div className="streak-val">{user?.streak || 12} <span style={{fontSize:'18px'}}>days</span></div>
        <div className="streak-sub">Keep it up! Best: 21 days</div>
      </div>
    </aside>
  );
}
