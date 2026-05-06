import React from 'react';
import { useUserStore } from '@/stores/userStore';

export default function PerformanceScreen() {
  const { user } = useUserStore();

  return (
    <div className="screen active">
      <div className="perf-hero" style={{background:'linear-gradient(135deg,#7c5cfc 0%,#0d9488 100%)', borderRadius:'20px', padding:'32px', marginBottom:'24px', display:'flex', alignItems:'center', gap:'40px', color:'white', position:'relative', overflow:'hidden', boxShadow:'0 8px 32px rgba(124,92,252,0.3)'}}>
        <div>
          <div style={{fontFamily:'Syne', fontSize:'72px', fontWeight:800, lineHeight:1}}>{user?.skillScore || 847}</div>
          <div style={{fontSize:'14px', opacity:0.85, marginTop:'6px'}}>Overall Skill Score</div>
        </div>
        <div style={{width:'1px', height:'80px', background:'rgba(255,255,255,0.25)'}}></div>
        <div style={{display:'flex', gap:'36px', flex:1, flexWrap:'wrap'}}>
           <div style={{textAlign:'center'}}>
             <div style={{fontFamily:'Syne', fontSize:'24px', fontWeight:800, marginBottom:'4px'}}>#{user?.rank || 47}</div>
             <div style={{fontSize:'11px', opacity:0.75}}>Global Rank</div>
           </div>
           <div style={{textAlign:'center'}}>
             <div style={{fontFamily:'Syne', fontSize:'24px', fontWeight:800, marginBottom:'4px'}}>Top 4%</div>
             <div style={{fontSize:'11px', opacity:0.75}}>Percentile</div>
           </div>
        </div>
      </div>

      <div className="grid-2" style={{gap: '20px'}}>
        <div className="card">
          <div className="section-title mb-16">📈 Learning Velocity</div>
          <div style={{height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', borderRadius: 'var(--r-sm)', color: 'var(--text3)'}}>
             Chart Placeholder
          </div>
        </div>
        <div className="card">
           <div className="section-title mb-16">🔥 Activity Heatmap</div>
           <div style={{height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', borderRadius: 'var(--r-sm)', color: 'var(--text3)'}}>
             Heatmap Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
