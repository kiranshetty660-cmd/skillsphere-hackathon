import React from 'react';

export default function CertificationsScreen() {
  return (
    <div className="screen active">
       <div className="section-head mb-16">
         <div className="section-title">🏆 Your Certifications</div>
       </div>

       <div className="grid-3 mb-24">
         <div className="cert-card earned" style={{borderRadius: 'var(--r)', padding: '22px', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow)', background: 'linear-gradient(145deg,var(--teal-bg),#b2f5ea)', border: '1.5px solid var(--teal-mid)'}}>
            <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg,var(--teal),#34d399)'}}></div>
            <div className="cert-icon" style={{fontSize: '34px', marginBottom: '12px'}}>🐍</div>
            <div className="cert-name" style={{fontFamily: 'Syne', fontSize: '15px', fontWeight: 800, marginBottom: '3px'}}>Python Professional</div>
            <div className="cert-org" style={{fontSize: '12px', color: 'var(--text2)', marginBottom: '10px'}}>SkillSphere</div>
            <div className="cert-status earned" style={{fontSize: '12px', fontWeight: 700, color: 'var(--teal)'}}>✓ Earned on Mar 12</div>
            <button className="btn btn-teal mt-12" style={{marginTop: '12px', padding: '6px 12px', fontSize: '11px', width: '100%', justifyContent: 'center'}}>Download PDF</button>
         </div>

         <div className="cert-card pending" style={{borderRadius: 'var(--r)', padding: '22px', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow)', background: 'linear-gradient(145deg,var(--amber-bg),#fef3c7)', border: '1.5px solid var(--amber-mid)'}}>
            <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg,var(--amber),#fbbf24)'}}></div>
            <div className="cert-icon" style={{fontSize: '34px', marginBottom: '12px'}}>☕</div>
            <div className="cert-name" style={{fontFamily: 'Syne', fontSize: '15px', fontWeight: 800, marginBottom: '3px'}}>Java Developer</div>
            <div className="cert-org" style={{fontSize: '12px', color: 'var(--text2)', marginBottom: '10px'}}>SkillSphere</div>
            <div className="cert-status pending" style={{fontSize: '12px', fontWeight: 700, color: 'var(--amber)'}}>⏳ In Progress (30%)</div>
         </div>
       </div>
    </div>
  );
}
