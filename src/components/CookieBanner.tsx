import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'paycycle_cookies_accepted'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) {
      setVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'false')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
    >
      <p className="cookie-banner-text">
        We use cookies to improve your experience. By continuing to use PayCycle, you agree to
        our{' '}
        <Link to="/cookies" className="cookie-policy-link">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="cookie-banner-actions">
        <button className="btn btn-primary btn-sm cookie-btn" onClick={handleAccept}>
          Accept
        </button>
        <button
          className="btn btn-ghost btn-sm cookie-btn cookie-btn-decline"
          onClick={handleDecline}
        >
          Decline
        </button>
      </div>
    </div>
  )
}
