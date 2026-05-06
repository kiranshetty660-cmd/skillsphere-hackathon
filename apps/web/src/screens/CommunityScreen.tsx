import React from 'react';
import { Chip } from '@/components/ui';

export default function CommunityScreen() {
  return (
    <div className="screen active">
      <div className="community-layout" style={{display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px'}}>
        <div>
           <div className="card mb-16" style={{padding: '16px'}}>
             <form style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
               <textarea 
                 placeholder="Share an achievement, tip, or question..." 
                 style={{width: '100%', padding: '12px', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', resize: 'vertical', minHeight: '80px', fontFamily: 'inherit'}}
               />
               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <div style={{fontSize: '12px', color: 'var(--text2)'}}>Type: [Question][Project][Achievement][Tip]</div>
                 <button className="btn btn-violet">Post (+10 pts)</button>
               </div>
             </form>
           </div>

           <div className="post-card">
              <div className="post-top" style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px'}}>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                   <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800}}>S</div>
                   <div>
                     <div className="post-title" style={{fontFamily: 'Syne', fontSize: '14px', fontWeight: 700}}>Sneha Iyer</div>
                     <div className="post-meta" style={{fontSize: '11px', color: 'var(--text2)'}}>SDE-1 @ Microsoft · 2h ago</div>
                   </div>
                </div>
                <Chip color="teal">Achievement</Chip>
              </div>
              <p className="text-sm" style={{lineHeight: 1.6, margin: '10px 0'}}>Just hit a 100-day streak on SkillSphere! Consistent practice really makes a difference. 🚀</p>
              <div className="post-actions" style={{display: 'flex', gap: '14px', marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '10px'}}>
                <span className="post-action" style={{fontSize: '12px', color: 'var(--text2)', cursor: 'pointer'}}>👍 142</span>
                <span className="post-action" style={{fontSize: '12px', color: 'var(--text2)', cursor: 'pointer'}}>💬 24</span>
              </div>
            </div>
        </div>
        
        <div>
           <div className="card">
             <div className="section-title mb-16">🏆 Top Contributors</div>
             <div style={{fontSize: '13px', color: 'var(--text2)'}}>Leaderboard Placeholder</div>
           </div>
        </div>
      </div>
    </div>
  );
}
