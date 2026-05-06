import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';

const INTERSTS_LIST = [
  '💻 Programming', '📊 Data Science', '🤖 AI / ML', '🎨 UI/UX Design', 
  '☁️ Cloud & DevOps', '🔐 Cybersecurity', '🧮 DSA & Algorithms', 
  '📝 Technical Blogging', '🚀 Startups & Product', '📱 Mobile Development'
];

export default function InterestScreen() {
  const { setScreen, setUser } = useUserStore();
  const [selected, setSelected] = useState<string[]>(['💻 Programming', '🤖 AI / ML', '🧮 DSA & Algorithms']);

  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else {
      setSelected([...selected, interest]);
    }
  };

  const handleContinue = () => {
    // Mock setting user profile
    setUser({
      id: 'mock-user',
      email: 'alex@skillsphere.dev',
      name: 'Alex Kumar',
      skillScore: 847,
      rank: 47,
      streak: 12,
      interests: selected,
      badges: ['Beta Tester'],
      role: 'user',
      createdAt: new Date().toISOString()
    });
    setScreen('home');
  };

  return (
    <div className="interest-overlay" style={{display: 'flex'}}>
      <div className="interest-card">
        <div className="login-logo" style={{fontSize: '22px', marginBottom: '8px'}}>
          <span className="logo-skill">Skill</span><span className="logo-sphere">Sphere</span><span className="logo-dot">.</span>
        </div>
        <div className="interest-heading">What's your field? 🎯</div>
        <p className="interest-sub">Pick your interests — we'll personalize everything for you</p>
        
        <div className="interest-chips" style={{display: 'flex', flexWrap: 'wrap', gap: '9px', marginBottom: '28px'}}>
          {INTERSTS_LIST.map(interest => (
            <div 
              key={interest}
              className={`int-chip ${selected.includes(interest) ? 'active' : ''}`} 
              onClick={() => toggleInterest(interest)}
              style={{
                padding: '9px 16px', borderRadius: '50px',
                border: '1.5px solid var(--border)', background: 'var(--bg)',
                fontSize: '13.5px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.18s', color: 'var(--text2)',
                ...(selected.includes(interest) ? {borderColor: 'var(--violet)', background: 'var(--violet-mid)', color: 'var(--violet)', fontWeight: 700} : {})
              }}
            >
              {interest}
            </div>
          ))}
        </div>
        
        <button className="btn btn-violet btn-full" onClick={handleContinue}>Continue to SkillSphere →</button>
      </div>
    </div>
  );
}
