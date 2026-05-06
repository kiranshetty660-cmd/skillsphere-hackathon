import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { api } from '@/services/api';

export default function LoginScreen() {
  const { setScreen, setToken, setUser } = useUserStore();
  const [email, setEmail] = useState('alex@skillsphere.dev');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.accessToken);
      setUser(res.data.user);
      setScreen('home'); // Skip interest screen for seeded user
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay" style={{display: 'flex'}}>
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-skill">Skill</span><span className="logo-sphere">Sphere</span><span className="logo-dot">.</span>
        </div>
        <p className="login-tagline">AI-powered skill development platform</p>
        <div className="login-heading">Welcome back 👋</div>
        
        {error && <div style={{background: 'var(--red-bg)', color: 'var(--red)', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px'}}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="input-label">Email address</div>
            <input 
              className="input-field" 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <div className="input-label">Password</div>
            <input 
              className="input-field" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-violet btn-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to SkillSphere →'}
          </button>
        </form>
        
        <div className="login-links">
          <span className="text-sm text-muted">No account? <span className="link" onClick={() => setScreen('interest')}>Sign up free</span></span>
          <span className="link text-sm">Forgot password?</span>
        </div>
      </div>
    </div>
  );
}
