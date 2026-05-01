'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AuthFormProps {
  type: 'login' | 'signup'
}

export default function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card glass animate-fade-in">
      <h2 className="heading">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
      <p className="subtext">{type === 'login' ? 'Enter your credentials to access your dashboard' : 'Join us to manage your team projects'}</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {type === 'signup' && (
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="auth-footer">
        {type === 'login' ? "Don't have an account? " : "Already have an account? "}
        <Link href={type === 'login' ? '/signup' : '/login'}>
          {type === 'login' ? 'Sign Up' : 'Login'}
        </Link>
      </p>

      <style jsx>{`
        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 40px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .heading {
          font-size: 2rem;
          text-align: center;
        }
        .subtext {
          color: var(--text-secondary);
          text-align: center;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .btn-primary {
          background: var(--accent-color);
          color: white;
          padding: 12px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          margin-top: 10px;
        }
        .btn-primary:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .error-message {
          color: var(--danger-color);
          font-size: 0.85rem;
          text-align: center;
        }
        .auth-footer {
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .auth-footer a {
          color: var(--accent-color);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
