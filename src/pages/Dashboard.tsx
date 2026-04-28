import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { BottomNav } from '../components/BottomNav'
import { GoalProgressBar } from '../components/GoalProgressBar'
import { useDashboardData } from '../hooks/useDashboardData'

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const CATEGORIES = [
  { key: 'needs',       label: 'Needs',       colorClass: 'cat-needs' },
  { key: 'wants',       label: 'Wants',       colorClass: 'cat-wants' },
  { key: 'savings',     label: 'Savings',     colorClass: 'cat-savings' },
  { key: 'investments', label: 'Investments', colorClass: 'cat-investments' },
] as const

export function Dashboard() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const { totalBalance, categoryTotals, loading, error } = useDashboardData()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const goalAmount = profile?.financial_goal_amount ?? 0
  const hasSavingsGoal = goalAmount > 0

  return (
    <div className="app-shell">
      <div className="page-content">

        {/* ── Header ── */}
        <header className="dashboard-header">
          <h1 className="dashboard-welcome">
            {profile?.name ? `Welcome back, ${profile.name}` : 'Welcome back!'}
          </h1>
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleLogout}
          >
            Log out
          </button>
        </header>

        {loading && (
          <p className="text-muted text-sm" aria-live="polite" aria-busy="true">
            Loading…
          </p>
        )}

        {!loading && error && (
          <p className="text-sm dashboard-error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {/* ── Total Balance ── */}
            <div className="card balance-card">
              <p className="balance-label">Total Balance</p>
              <p className="balance-value">{fmt.format(totalBalance)}</p>
              {totalBalance === 0 && (
                <p className="text-muted text-sm balance-hint">
                  Add your first paycheck to get started
                </p>
              )}
            </div>

            {/* ── Category Grid ── */}
            <section aria-label="Spending categories">
              <div className="category-grid">
                {CATEGORIES.map(({ key, label, colorClass }) => (
                  <div key={key} className={`card category-card ${colorClass}`}>
                    <p className="category-label">{label}</p>
                    <p className="category-value">
                      {fmt.format(categoryTotals[key])}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Savings Goal ── */}
            <section className="card goal-section" aria-label="Savings goal">
              <p className="goal-heading">Savings Goal</p>
              {hasSavingsGoal ? (
                <GoalProgressBar
                  saved={categoryTotals.savings}
                  goal={goalAmount}
                />
              ) : (
                <div className="goal-empty">
                  <p className="text-muted text-sm">
                    Set a savings goal to track your progress
                  </p>
                  <Link to="/goal" className="btn btn-outline goal-set-btn">
                    Set a savings goal
                  </Link>
                </div>
              )}
            </section>

            {/* ── Quick Actions ── */}
            <section className="quick-actions" aria-label="Quick actions">
              <Link to="/income/add" className="btn btn-primary">
                Add Income
              </Link>
              <Link to="/goal" className="btn btn-outline">
                View Goal
              </Link>
            </section>
          </>
        )}

      </div>
      <BottomNav />
    </div>
  )
}
