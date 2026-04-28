import { BottomNav } from '../components/BottomNav'

export function GoalProgress() {
  return (
    <div className="app-shell">
      <div className="page-content">
        <div className="stub-content">
          <div className="stub-icon" aria-hidden="true">🎯</div>
          <p className="stub-title">Goal Progress</p>
          <p className="stub-sub">Goal setting and tracking coming soon.</p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
