import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

type Mode = 'signin' | 'signup'

interface FormValues {
  name: string
  email: string
  password: string
}

export function Login() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('signin')
  const [authError, setAuthError] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  // Already logged in → go straight to dashboard
  useEffect(() => {
    if (session) navigate('/dashboard', { replace: true })
  }, [session, navigate])

  function switchMode(next: Mode) {
    setMode(next)
    setAuthError('')
    setShowForgot(false)
    setForgotEmail('')
    setForgotSent(false)
    reset()
  }

  async function onSubmit(data: FormValues) {
    setAuthError('')

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) { setAuthError(error.message); return }
    } else {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { name: data.name } },
      })
      if (error) { setAuthError(error.message); return }
    }

    navigate('/dashboard', { replace: true })
  }

  async function handleForgotPassword() {
    if (!forgotEmail) return
    setForgotLoading(true)
    await supabase.auth.resetPasswordForEmail(forgotEmail)
    setForgotLoading(false)
    setForgotSent(true)
  }

  return (
    <div className="app-shell login-shell">
      <div className="login-container">

        {/* ── Logo ── */}
        <div className="login-logo">
          <span className="logo-wordmark">PayCycle</span>
          <p className="login-tagline">Make every paycheck count</p>
        </div>

        {/* ── Auth form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className="input"
                autoComplete="name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p id="name-error" className="field-error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              autoComplete={mode === 'signin' ? 'username' : 'email'}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p id="email-error" className="field-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password', {
                required: 'Password is required',
                ...(mode === 'signup' && {
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                }),
              })}
            />
            {errors.password && (
              <p id="password-error" className="field-error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {authError && (
            <p className="field-error auth-error" role="alert">
              {authError}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting
              ? 'Please wait…'
              : mode === 'signin'
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>

        {/* ── Forgot password (sign-in mode only) ── */}
        {mode === 'signin' && !showForgot && (
          <button
            type="button"
            className="forgot-trigger"
            onClick={() => setShowForgot(true)}
          >
            Forgot password?
          </button>
        )}

        {mode === 'signin' && showForgot && (
          <div className="forgot-box">
            {forgotSent ? (
              <p className="forgot-success">
                Check your email for a reset link.
              </p>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="forgot-email">Enter your email address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="input"
                    autoComplete="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleForgotPassword}
                  disabled={forgotLoading || !forgotEmail}
                >
                  {forgotLoading ? 'Sending…' : 'Send Reset Link'}
                </button>
                <button
                  type="button"
                  className="forgot-cancel"
                  onClick={() => { setShowForgot(false); setForgotEmail('') }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}

        {/* ── Mode toggle ── */}
        <p className="mode-toggle">
          {mode === 'signin' ? (
            <>
              Don&apos;t have an account?{' '}
              <button type="button" className="link-btn" onClick={() => switchMode('signup')}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" className="link-btn" onClick={() => switchMode('signin')}>
                Sign in
              </button>
            </>
          )}
        </p>

      </div>
    </div>
  )
}
