const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

interface GoalProgressBarProps {
  saved: number
  goal: number
}

export function GoalProgressBar({ saved, goal }: GoalProgressBarProps) {
  const pct = goal > 0 ? Math.min((saved / goal) * 100, 100) : 0
  const pctRounded = Math.round(pct)

  return (
    <div className="goal-progress-bar">
      <div className="goal-progress-labels">
        <span className="text-sm">
          Saved {fmt.format(saved)} of {fmt.format(goal)}
        </span>
        <span className="text-sm font-medium">{pctRounded}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Savings goal: ${pctRounded}% complete`}
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
