import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Chip } from '@/components/ui';
import { api } from '@/services/api';

export default function TrainingScreen() {
  const [activeTab, setActiveTab] = useState('programming');

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await api.get('/courses');
      return res.data.data;
    }
  });

  const tabs = [
    { id: 'programming', label: '💻 Programming' },
    { id: 'codezone', label: '⌨️ CodeZone' },
    { id: 'assignments', label: '📋 Assignments' },
    { id: 'blogs', label: '📝 Blogs' },
    { id: 'plugins', label: '🔌 Plug-ins' },
    { id: 'projects', label: '🚀 Projects' },
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

      {activeTab === 'programming' && (
        <div id="ttab-programming">
          <div className="section-head mb-16">
            <div className="section-title">Available Languages & Courses</div>
            <button className="btn btn-violet" style={{padding:'9px 16px', fontSize:'12px'}}>+ Enroll New</button>
          </div>
          <div className="grid-4 mb-24">
            {isLoading ? <div className="text-muted">Loading courses...</div> : coursesData?.map((course: any, idx: number) => {
              const colors = ['violet', 'blue', 'teal', 'orange'];
              const cName = colors[idx % colors.length];
              const progress = course.progress?.[0]?.progressPercent || 0;
              
              return (
                <div key={course.id} className={`course-card c-${cName}`} style={{borderRadius:'var(--r)', padding:'20px', cursor:'pointer', position:'relative', overflow:'hidden', boxShadow:'var(--shadow)', border:`1.5px solid var(--${cName}-mid)`, background:`linear-gradient(145deg,var(--surface),var(--${cName}-bg))`}}>
                  <div style={{width:'50px', height:'50px', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', marginBottom:'14px', background:'white', boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>{course.emoji}</div>
                  <div style={{fontFamily:'Syne', fontSize:'16px', fontWeight:800, marginBottom:'3px', color:'var(--text)'}}>{course.title}</div>
                  <div style={{fontSize:'12px', color:'var(--text2)', marginBottom:'14px'}}>{course.level} · {course.modulesCount} modules · {course.durationHours}h</div>
                  <div className="progress-track"><div className={`progress-fill pf-${cName}`} style={{width:`${progress}%`}}></div></div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:'12px', marginTop:'8px'}}>
                    <span className="text-muted">{progress > 0 ? `${progress}% done` : 'Not started'}</span>
                    <Chip color={cName as any} className="text-xs">{progress > 0 ? 'Active' : 'Start'}</Chip>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="grid-2" style={{gap:'20px'}}>
            <div className="card" style={{background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:'var(--r)', padding:'20px', boxShadow:'var(--shadow)'}}>
              <div className="section-title" style={{marginBottom:'14px'}}>📈 Learning Roadmap</div>
              <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                <div style={{display:'flex', gap:'10px', alignItems:'center', padding:'10px', background:'var(--green-bg)', borderRadius:'10px', border:'1.5px solid var(--green-mid)'}}><div style={{fontSize:'16px'}}>✅</div><div><div style={{fontSize:'13px', fontWeight:700, color:'var(--green)'}}>Variables, Data Types, Loops</div><div className="text-xs text-muted">Completed</div></div></div>
                <div style={{display:'flex', gap:'10px', alignItems:'center', padding:'10px', background:'var(--violet-bg)', borderRadius:'10px', border:'1.5px solid var(--violet-mid)'}}><div style={{fontSize:'16px'}}>🔄</div><div><div style={{fontSize:'13px', fontWeight:700, color:'var(--violet)'}}>Functions & OOP</div><div className="text-xs text-muted">In Progress · 62%</div></div></div>
                <div style={{display:'flex', gap:'10px', alignItems:'center', padding:'10px', background:'var(--bg)', borderRadius:'10px', border:'1.5px solid var(--border)', opacity:0.6}}><div style={{fontSize:'16px'}}>🔒</div><div><div style={{fontSize:'13px', fontWeight:600, color:'var(--text2)'}}>File Handling & APIs</div><div className="text-xs text-muted">Locked</div></div></div>
              </div>
            </div>
            
            <div className="ai-card" style={{background:'linear-gradient(145deg,var(--indigo-bg),var(--violet-bg))', border:'1.5px solid var(--indigo-mid)', borderRadius:'var(--r)', padding:'22px', boxShadow:'var(--shadow)'}}>
              <div className="ai-card-title" style={{fontFamily:'Syne', fontSize:'15px', fontWeight:800, marginBottom:'16px', color:'var(--indigo)'}}>🤖 AI Course Recommendations</div>
              <div className="ai-insight" style={{display:'flex', gap:'10px', fontSize:'13px', color:'#374151', lineHeight:1.6, marginBottom:'11px', paddingBottom:'11px', borderBottom:'1px solid rgba(99,102,241,0.1)'}}><span className="ai-arrow" style={{color:'var(--teal)', flexShrink:0, fontWeight:800}}>→</span>Complete Python OOP module — it unlocks Django & Flask frameworks.</div>
              <div className="ai-insight" style={{display:'flex', gap:'10px', fontSize:'13px', color:'#374151', lineHeight:1.6, marginBottom:'11px', paddingBottom:'11px', borderBottom:'1px solid rgba(99,102,241,0.1)'}}><span className="ai-arrow" style={{color:'var(--teal)', flexShrink:0, fontWeight:800}}>→</span>Java is 30% done — 4 more modules to unlock Java Certification.</div>
              <div className="ai-insight" style={{display:'flex', gap:'10px', fontSize:'13px', color:'#374151', lineHeight:1.6}}><span className="ai-arrow" style={{color:'var(--teal)', flexShrink:0, fontWeight:800}}>→</span>Try C fundamentals to strengthen your DSA problem-solving base.</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'codezone' && (
        <div id="ttab-codezone">
          <div className="section-head mb-16">
            <div className="section-title">⌨️ CodeZone — Live Coding Environment</div>
            <div style={{display:'flex', gap:'8px'}}>
              <Chip color="teal">Daily Streak: 12🔥</Chip>
              <Chip color="violet">342 Problems Solved</Chip>
            </div>
          </div>
          <div className="grid-2" style={{gap:'20px'}}>
             <div>
               <div style={{background:'#1e2432', borderRadius:'var(--r)', overflow:'hidden', boxShadow:'var(--shadow-md)', marginBottom:'14px'}}>
                 <div style={{background:'#161b28', padding:'11px 16px', display:'flex', alignItems:'center', gap:'7px'}}>
                   <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#ff6b6b'}}></div>
                   <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#fbbf24'}}></div>
                   <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#34d399'}}></div>
                   <span style={{fontSize:'12px', color:'#94a3b8', marginLeft:'8px'}}>solution.py</span>
                 </div>
                 <div style={{padding:'20px', fontFamily:'"Courier New",monospace', fontSize:'13px', lineHeight:1.75, color:'#e2e8f0'}}>
                   <span style={{color:'#6b7280'}}># Two Sum — LeetCode #1</span><br/>
                   <span style={{color:'#c084fc'}}>def</span> <span style={{color:'#5eead4'}}>twoSum</span>(nums, target):<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;seen = {}<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'#c084fc'}}>for</span> i, num <span style={{color:'#c084fc'}}>in</span> <span style={{color:'#5eead4'}}>enumerate</span>(nums):<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;diff = target - num<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'#c084fc'}}>if</span> diff <span style={{color:'#c084fc'}}>in</span> seen:<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'#c084fc'}}>return</span> [seen[diff], i]<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seen[num] = i<br/>
                 </div>
               </div>
               <div style={{background:'#1e2432', borderRadius:'var(--r-sm)', padding:'14px'}}>
                 <div style={{fontSize:'11px', color:'#6b7280', marginBottom:'6px'}}>OUTPUT</div>
                 <div style={{fontFamily:'"Courier New",monospace', fontSize:'13px', color:'#86efac'}}>✓ Test case 1 passed: [0, 1]</div>
                 <div style={{fontFamily:'"Courier New",monospace', fontSize:'13px', color:'#fde68a', marginTop:'4px'}}>Runtime: 52ms · Memory: 14.2MB</div>
               </div>
             </div>
             
             <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
               <div className="card" style={{padding: '20px', background: 'var(--surface)', borderRadius: 'var(--r)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow)'}}>
                 <div style={{fontFamily:'Syne', fontWeight:800, fontSize:'14px', marginBottom:'12px'}}>🎯 Problem Categories</div>
                 <div style={{display:'flex', flexWrap:'wrap', gap:'8px'}}>
                   <span style={{padding:'6px 12px', background:'var(--violet-bg)', border:'1.5px solid var(--violet-mid)', borderRadius:'50px', fontSize:'12px', fontWeight:600, color:'var(--violet)'}}>Arrays (48)</span>
                   <span style={{padding:'6px 12px', background:'var(--teal-bg)', border:'1.5px solid var(--teal-mid)', borderRadius:'50px', fontSize:'12px', fontWeight:600, color:'var(--teal)'}}>Trees (32)</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      )}
      
      {activeTab === 'assignments' && (<div>📋 Assignments (Mock)</div>)}
      {activeTab === 'blogs' && (<div>📝 Blogs (Mock)</div>)}
      {activeTab === 'plugins' && (<div>🔌 Plug-ins (Mock)</div>)}
      {activeTab === 'projects' && (<div>🚀 Projects (Mock)</div>)}
      
    </div>
  );
}
