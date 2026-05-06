import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/stores/userStore';
import { StatCard, Chip, ProgressBar } from '@/components/ui';
import { api } from '@/services/api';

export default function HomeScreen() {
  const { user } = useUserStore();

  const { data: coursesData } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await api.get('/courses');
      return res.data.data;
    }
  });

  const { data: jobsData } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await api.get('/jobs');
      return res.data.data;
    }
  });

  // Get active courses that have progress
  const activeCourses = coursesData?.filter((c: any) => c.progress && c.progress.length > 0) || [];
  // Get latest job
  const latestJob = jobsData?.[0];

  return (
    <div className="screen active">
      <div className="home-hero mb-20">
        <div className="hero-text">
          <h1>Good morning, {user?.name?.split(' ')[0] || 'Alex'} 👋</h1>
          <p>Your personalized learning journey continues. <strong>{user?.streak || 12}-day streak!</strong> 🔥</p>
          <div style={{display:'flex', gap:'8px', marginTop:'14px', flexWrap:'wrap'}}>
            {user?.interests?.map((interest: string, i: number) => {
              const colors = ['violet', 'teal', 'cyan', 'blue', 'pink'];
              return <Chip key={interest} color={colors[i % colors.length] as any}>{interest}</Chip>;
            })}
          </div>
        </div>
        <div className="ring-wrap">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="10"
              strokeDasharray="314" strokeDashoffset="79" strokeLinecap="round" transform="rotate(-90 60 60)"/>
          </svg>
          <div className="ring-label">
            <span className="ring-val">{user?.skillScore || 847}</span>
            <span className="ring-sub">Score</span>
          </div>
        </div>
      </div>

      <div className="grid-4 mb-20">
        <StatCard title="Avg Test Score" value="88%" trend="↑ +6% this month" icon="🎯" color="violet" />
        <StatCard title="Active Courses" value="5" trend="2 due this week" icon="📚" color="teal" />
        <StatCard title="Certifications" value="3" trend="1 in progress" icon="🏆" color="amber" />
        <StatCard title="Weak Areas" value="3" trend="Needs attention" icon="⚠️" color="red" />
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        <div>
          <div className="section-head">
            <div className="section-title">📌 Job & Skill Posts</div>
            <span className="section-link">View all →</span>
          </div>
          {latestJob ? (
            <div className="post-card">
              <div className="post-top">
                <div>
                  <div className="post-title">{latestJob.title}</div>
                  <div className="post-meta">{latestJob.company} · {new Date(latestJob.createdAt).toLocaleDateString()}</div>
                </div>
                <Chip color="teal">🏢 Job</Chip>
              </div>
              <p className="text-sm text-muted" style={{lineHeight: 1.6}}>{latestJob.description}</p>
              <div className="post-actions">
                <span className="post-action">👍 28</span>
                <span className="post-action">💬 12</span>
                <span className="post-action apply" style={{marginLeft: 'auto', color: 'var(--teal)', fontWeight: 700}}>Apply Now →</span>
              </div>
            </div>
          ) : <div className="text-muted">Loading posts...</div>}
        </div>

        <div>
          <div className="section-head"><div className="section-title">📈 Your Progress</div></div>
          <div className="card mb-16">
            {activeCourses.length > 0 ? activeCourses.slice(0,2).map((course: any, idx: number) => {
              const colors = ['violet', 'teal', 'blue', 'orange'];
              const cName = colors[idx % colors.length];
              const progress = course.progress[0].progressPercent;
              return (
                <div key={course.id} className="progress-wrap">
                  <div className="progress-head"><span>{course.title}</span><span className="progress-pct" style={{color:`var(--${cName})`}}>{progress}%</span></div>
                  <ProgressBar percent={progress} color={cName as any} />
                </div>
              );
            }) : <div className="text-muted">No active courses yet.</div>}
          </div>
          
          <div className="ai-card">
            <div className="ai-card-title">🤖 AI Insights</div>
            <div className="ai-insight"><span className="ai-arrow" style={{color:'var(--teal)', fontWeight: 800, marginRight: '10px'}}>→</span>System Design at 40% — focus 30 min/day for 2 weeks to unlock SDE-2 roles.</div>
            <div className="ai-insight"><span className="ai-arrow" style={{color:'var(--teal)', fontWeight: 800, marginRight: '10px'}}>→</span>Python score qualifies you for 5 open positions this week.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
