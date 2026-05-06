'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const INTEREST_OPTIONS = [
  '💻 Programming',
  '📊 Data Science',
  '🤖 AI / ML',
  '🎨 UI/UX Design',
  '☁️ Cloud & DevOps',
  '🔐 Cybersecurity',
  '🧮 DSA & Algorithms',
  '📝 Technical Blogging',
  '🚀 Startups & Product',
  '📱 Mobile Development'
]

export default function OnboardingPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleContinue = async () => {
    if (selectedInterests.length === 0) return
    
    setLoading(true)
    
    // Bypass for UI testing
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project.supabase.co')) {
      router.push('/dashboard/home')
      return
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        interests: selectedInterests,
      })
    }
    
    router.push('/dashboard/home')
  }

  return (
    <div className="interest-overlay" style={{ display: 'flex' }}>
      <div className="interest-card">
        <div className="login-logo" style={{ fontSize: '22px', marginBottom: '8px' }}>
          <span className="logo-skill">Skill</span>
          <span className="logo-sphere">Sphere</span>
          <span className="logo-dot">.</span>
        </div>
        <div className="interest-heading">What's your field? 🎯</div>
        <p className="interest-sub">Pick your interests — we'll personalize everything for you</p>
        
        <div className="interest-chips">
          {INTEREST_OPTIONS.map(interest => (
            <div 
              key={interest}
              className={`int-chip ${selectedInterests.includes(interest) ? 'active' : ''}`} 
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </div>
          ))}
        </div>
        
        <button 
          className="btn btn-violet btn-full" 
          onClick={handleContinue}
          disabled={loading || selectedInterests.length === 0}
        >
          {loading ? 'Saving...' : 'Continue to SkillSphere →'}
        </button>
      </div>
    </div>
  )
}
