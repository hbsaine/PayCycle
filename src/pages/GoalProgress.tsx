import { BottomNav } from '../components/BottomNav'
import { useGoalProgress } from '../hooks/useGoalProgress'

export function GoalProgress() {
  const { targetAmount, currentAmount, percentage, loading, error } = useGoalProgress()

  return (
    <div className="app-shell">
      <div className="page-content">
        <header className="page-header">
          <h1 className="page-title">Goal Progress</h1>
          <p className="page-subtitle">Track your savings milestone</p>
        </header>

        {loading ? (
          <div className="loading-state">Loading your progress...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : targetAmount > 0 ? (
          <div className="goal-card">
            <div className="goal-header">
              <span className="goal-icon">🎯</span>
              <h2>Primary Goal</h2>
            </div>
            
            <div className="goal-amounts">
              <span className="current-amount">${currentAmount.toFixed(2)}</span>
              <span className="target-amount">/ ${targetAmount.toFixed(2)}</span>
            </div>

            <div className="goal-progress-container">
              <div 
                className="goal-progress-fill" 
                style={{ width: `${percentage}%` }}
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              ></div>
            </div>
            
            <div className="goal-percentage">
              <span className="percentage-text">{percentage}% Achieved</span>
              {percentage >= 100 && <span className="goal-achieved-badge">Goal Reached! 🎉</span>}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">💸</div>
            <p>You haven't set a financial goal yet.</p>
            <p className="empty-state-sub">Update your profile to start tracking.</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
