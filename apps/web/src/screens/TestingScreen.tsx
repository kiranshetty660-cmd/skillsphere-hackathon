import React, { useState } from 'react';
import { Chip } from '@/components/ui';

export default function TestingScreen() {
  const [activeTab, setActiveTab] = useState('aptizone');

  const tabs = [
    { id: 'aptizone', label: '🎯 AptiZone' },
    { id: 'yourtest', label: '📝 Your Test' },
    { id: 'aibooster', label: '🤖 AI Booster' },
    { id: 'globaltest', label: '🌐 Global Test' },
  ];

  return (
    <div className="screen active">
      <div className="tabs-wrap mb-24" style={{display:'flex', gap:'4px', background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:'var(--r-sm)', padding:'4px', overflowX:'auto', boxShadow:'var(--shadow)'}}>
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{padding:'8px 15px', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.15s', ...(activeTab === tab.id ? {background:'var(--violet)', color:'white', boxShadow:'0 2px 8px rgba(124,92,252,0.3)'} : {color:'var(--text2)'})}}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {activeTab === 'aptizone' && (
        <div id="testab-aptizone">
          <div className="section-head mb-16">
            <div className="section-title">🎯 AptiZone — Aptitude Test Bank</div>
            <Chip color="violet">1,200+ Questions</Chip>
          </div>
          <div className="grid-4 mb-20">
            <div style={{background:'linear-gradient(145deg,var(--violet-bg),var(--violet-mid))', border:'1.5px solid var(--violet-mid)', borderRadius:'var(--r)', padding:'18px', textAlign:'center', boxShadow:'var(--shadow)'}}><div style={{fontFamily:'Syne', fontSize:'26px', fontWeight:800, color:'var(--violet)'}}>88%</div><div style={{fontSize:'12px', color:'var(--text2)'}}>Avg Score</div></div>
            <div style={{background:'linear-gradient(145deg,var(--teal-bg),var(--teal-mid))', border:'1.5px solid var(--teal-mid)', borderRadius:'var(--r)', padding:'18px', textAlign:'center', boxShadow:'var(--shadow)'}}><div style={{fontFamily:'Syne', fontSize:'26px', fontWeight:800, color:'var(--teal)'}}>14</div><div style={{fontSize:'12px', color:'var(--text2)'}}>Tests Taken</div></div>
            <div style={{background:'linear-gradient(145deg,var(--blue-bg),var(--blue-mid))', border:'1.5px solid var(--blue-mid)', borderRadius:'var(--r)', padding:'18px', textAlign:'center', boxShadow:'var(--shadow)'}}><div style={{fontFamily:'Syne', fontSize:'26px', fontWeight:800, color:'var(--blue)'}}>#47</div><div style={{fontSize:'12px', color:'var(--text2)'}}>Current Rank</div></div>
            <div style={{background:'linear-gradient(145deg,var(--amber-bg),#fef3c7)', border:'1.5px solid var(--amber-mid)', borderRadius:'var(--r)', padding:'18px', textAlign:'center', boxShadow:'var(--shadow)'}}><div style={{fontFamily:'Syne', fontSize:'26px', fontWeight:800, color:'var(--amber)'}}>92%</div><div style={{fontSize:'12px', color:'var(--text2)'}}>Best Score</div></div>
          </div>
          
          <div className="grid-2" style={{gap:'20px'}}>
             <div>
               <div className="section-title" style={{marginBottom:'14px'}}>📂 Test Categories</div>
               <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                 <div style={{background:'linear-gradient(145deg,var(--violet-bg),#ede8ff)', border:'1.5px solid var(--violet-mid)', borderRadius:'var(--r)', padding:'16px', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px', transition:'all 0.2s'}}>
                   <div style={{width:'40px', height:'40px', borderRadius:'10px', background:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>🔢</div>
                   <div style={{flex:1}}><div style={{fontSize:'13px', fontWeight:700, color:'var(--violet)'}}>Quantitative Aptitude</div><div className="text-xs text-muted">Number theory, percentages, time & work — 320 questions</div></div>
                   <button className="btn btn-violet" style={{padding:'7px 12px', fontSize:'11px', flexShrink:0}}>Practice</button>
                 </div>
               </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'yourtest' && (<div>📝 Your Test (Mock)</div>)}
      {activeTab === 'aibooster' && (<div>🤖 AI Booster (Mock)</div>)}
      {activeTab === 'globaltest' && (<div>🌐 Global Test (Mock)</div>)}

    </div>
  );
}
