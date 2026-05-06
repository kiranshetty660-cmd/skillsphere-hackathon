'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Bypass for UI testing
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project.supabase.co')) {
      router.push('/dashboard/home')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard/home')
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    setError(null)
    
    // Bypass for UI testing
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project.supabase.co')) {
      router.push('/onboarding')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/onboarding')
    }
  }

  return (
    <div className="login-overlay" style={{ display: 'flex' }}>
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-skill">Skill</span>
          <span className="logo-sphere">Sphere</span>
          <span className="logo-dot">.</span>
        </div>
        <p className="login-tagline">AI-powered skill development platform</p>
        <div className="login-heading">Welcome back 👋</div>
        
        {error && (
          <div style={{ color: 'var(--red)', fontSize: '13px', marginBottom: '16px', background: 'var(--red-bg)', padding: '10px', borderRadius: 'var(--r-sm)' }}>
            {error}
          </div>
        )}

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
          <button 
            type="submit" 
            className="btn btn-violet btn-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login to SkillSphere →'}
          </button>
        </form>

        <div className="login-links">
          <span className="text-sm text-muted">
            No account? <span className="link" onClick={handleSignUp}>Sign up free</span>
          </span>
          <span className="link text-sm">Forgot password?</span>
        </div>
      </div>
    </div>
  )
}
