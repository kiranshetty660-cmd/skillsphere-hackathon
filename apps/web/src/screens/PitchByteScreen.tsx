import React, { useState } from 'react';
import { api } from '@/services/api';

export default function PitchByteScreen() {
  const [activeTab, setActiveTab] = useState('interview');

  // AI Detector State
  const [detectText, setDetectText] = useState('');
  const [detectResult, setDetectResult] = useState<any>(null);
  const [detectLoading, setDetectLoading] = useState(false);

  // Mock Interview State
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [interviewLoading, setInterviewLoading] = useState(false);

  const handleDetect = async () => {
    if (!detectText) return;
    setDetectLoading(true);
    try {
      const res = await api.post('/ai/detect', { text: detectText });
      setDetectResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDetectLoading(false);
    }
  };

  const handleInterviewStart = async () => {
    setInterviewLoading(true);
    try {
      const res = await api.post('/ai/interview', { topic: 'Software Engineering', pastMessages: [] });
      setMessages([{ role: 'assistant', content: res.data.response }]);
    } catch (err) {
      console.error(err);
    } finally {
      setInterviewLoading(false);
    }
  };

  const handleInterviewReply = async () => {
    if (!inputMsg) return;
    const newMsgs = [...messages, { role: 'user', content: inputMsg }];
    setMessages(newMsgs);
    setInputMsg('');
    setInterviewLoading(true);
    try {
      const res = await api.post('/ai/interview', { topic: 'Software Engineering', pastMessages: newMsgs });
      setMessages([...newMsgs, { role: 'assistant', content: res.data.response }]);
    } catch (err) {
      console.error(err);
    } finally {
      setInterviewLoading(false);
    }
  };

  const tabs = [
    { id: 'interview', label: '🎤 Mock Interview' },
    { id: 'personality', label: '🧠 Personality Test' },
    { id: 'detector', label: '🤖 AI Detector' },
    { id: 'vocal', label: '🗣️ Vocal Shift' },
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

      {activeTab === 'interview' && (
        <div id="pb-interview">
          <div className="section-head mb-16">
            <div className="section-title">🎤 AI Mock Interviewer</div>
          </div>
          {messages.length === 0 ? (
            <div className="card" style={{padding: '30px', textAlign: 'center'}}>
              <h2>Ready for your mock interview?</h2>
              <p className="text-muted" style={{marginTop: '10px', marginBottom: '20px'}}>
                Practice real questions with our GPT-4o powered AI and get instant feedback on clarity, relevance, and communication.
              </p>
              <button className="btn btn-violet" onClick={handleInterviewStart} disabled={interviewLoading}>
                {interviewLoading ? 'Starting...' : 'Start Interview'}
              </button>
            </div>
          ) : (
            <div className="card" style={{padding: '20px'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', maxHeight: '400px', overflowY: 'auto'}}>
                {messages.map((m, i) => (
                  <div key={i} style={{alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? 'var(--violet)' : 'var(--bg2)', color: m.role === 'user' ? 'white' : 'var(--text)', padding: '12px 16px', borderRadius: '14px', maxWidth: '80%', fontSize: '13px', lineHeight: 1.6}}>
                    {m.content}
                  </div>
                ))}
                {interviewLoading && <div style={{fontSize: '12px', color: 'var(--text2)'}}>AI is typing...</div>}
              </div>
              <div style={{display: 'flex', gap: '10px'}}>
                <input 
                  value={inputMsg} 
                  onChange={e => setInputMsg(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleInterviewReply()}
                  className="input-field" 
                  placeholder="Type your answer..." 
                  disabled={interviewLoading}
                />
                <button className="btn btn-violet" onClick={handleInterviewReply} disabled={interviewLoading || !inputMsg}>Reply</button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'detector' && (
        <div id="pb-detector">
           <div className="section-head mb-16">
            <div className="section-title">🤖 AI Content Detector</div>
          </div>
          <div className="card" style={{padding: '20px'}}>
            <textarea 
              value={detectText}
              onChange={e => setDetectText(e.target.value)}
              style={{width: '100%', height: '150px', padding: '15px', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'inherit', resize: 'vertical'}}
              placeholder="Paste your text here to detect AI generated content..."
            ></textarea>
            <div style={{marginTop: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px'}}>
               {detectResult && (
                 <div style={{flex: 1}}>
                   <div style={{fontSize: '14px', fontWeight: 700, color: detectResult.aiProbability > 50 ? 'var(--red)' : 'var(--green)'}}>
                     AI Probability: {detectResult.aiProbability}%
                   </div>
                   <div style={{fontSize: '12px', color: 'var(--text2)', marginTop: '4px'}}>{detectResult.reasoning}</div>
                 </div>
               )}
               <button className="btn btn-teal" onClick={handleDetect} disabled={detectLoading || !detectText}>
                 {detectLoading ? 'Analyzing...' : 'Detect Content'}
               </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'personality' && (<div>🧠 Personality Test (Mock)</div>)}
      {activeTab === 'vocal' && (<div>🗣️ Vocal Shift (Mock)</div>)}

    </div>
  );
}
