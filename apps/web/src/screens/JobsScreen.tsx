import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Chip } from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { api } from '@/services/api';

export default function JobsScreen() {
  const { user } = useUserStore();

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await api.get('/jobs');
      return res.data.data;
    }
  });

  return (
    <div className="screen active">
       <div className="card mb-20" style={{background: 'linear-gradient(135deg, var(--blue-bg), var(--violet-bg))', border: '1.5px solid var(--blue-mid)'}}>
         <h2 style={{fontFamily: 'Syne', fontWeight: 800, marginBottom: '8px', color: 'var(--violet)'}}>Your Job Matches</h2>
         <p style={{fontSize: '14px', color: 'var(--text2)'}}>Based on your skill score of {user?.skillScore} and completed modules, you have <strong>{jobsData?.length || 0} high-match</strong> job openings.</p>
       </div>

       <div className="grid-2">
         <div>
            <div className="section-title mb-16">Recommended Roles</div>
            {isLoading ? <div className="text-muted">Loading jobs...</div> : jobsData?.map((job: any) => (
              <div key={job.id} className="post-card">
                <div className="post-top">
                  <div>
                    <div className="post-title">{job.title}</div>
                    <div className="post-meta">{job.company} · {new Date(job.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div style={{background: 'var(--green-bg)', color: 'var(--green)', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: '1px solid var(--green-mid)'}}>94% Match</div>
                </div>
                <p className="text-sm text-muted" style={{lineHeight: 1.6, margin: '10px 0'}}>{job.description}</p>
                <div style={{display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'14px'}}>
                  {job.requirements?.map((req: string) => <Chip key={req} color="violet" className="text-xs">{req}</Chip>)}
                </div>
                <div className="post-actions">
                  <button className="btn btn-violet">Apply Now</button>
                  <button className="btn btn-ghost">Save</button>
                </div>
              </div>
            ))}
         </div>
         <div>
            <div className="section-title mb-16">Application Tracker</div>
            <div className="card">
               <div style={{fontSize: '13px', color: 'var(--text2)', textAlign: 'center', padding: '20px 0'}}>No active applications yet.</div>
            </div>
         </div>
       </div>
    </div>
  );
}
