import { BottomNav } from '../components/BottomNav'

export function FinancialNews() {
  return (
    <div className="app-shell">
      <div className="page-content">
        <div className="stub-content">
          <div className="stub-icon" aria-hidden="true">📰</div>
          <p className="stub-title">Financial News</p>
          <p className="stub-sub">Personalized financial news coming soon.</p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
