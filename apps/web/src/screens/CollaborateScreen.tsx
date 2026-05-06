import React from 'react';
import { Chip } from '@/components/ui';

export default function CollaborateScreen() {
  return (
    <div className="screen active">
       <div className="section-head mb-16">
          <div className="section-title">🤝 Open Collaborations</div>
          <button className="btn btn-violet">+ New Request</button>
       </div>

       <div className="grid-2">
         <div className="collab-card" style={{background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', padding: '20px', transition: 'all 0.2s', cursor: 'pointer', boxShadow: 'var(--shadow)'}}>
            <div className="collab-title" style={{fontFamily: 'Syne', fontSize: '15px', fontWeight: 800, marginBottom: '6px'}}>Co-founder needed — AI-powered EdTech SaaS</div>
            <div className="collab-desc" style={{fontSize: '13px', color: '#374151', lineHeight: 1.6, marginBottom: '12px'}}>Building B2B skill assessment. Need React + Node.js. Equity-based.</div>
            <div className="collab-tags" style={{display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px'}}>
              <Chip color="violet">React</Chip>
              <Chip color="blue">Node.js</Chip>
            </div>
            <div className="collab-footer" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text2)'}}>
              <span>by Rahul Mehta · 1d ago</span>
              <button className="btn btn-teal" style={{padding: '6px 12px', fontSize: '11px'}}>Connect →</button>
            </div>
         </div>
       </div>
    </div>
  );
}
