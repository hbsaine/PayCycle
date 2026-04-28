import { NavLink } from 'react-router-dom'

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">

      <NavLink
        to="/dashboard"
        className={({ isActive }) => isActive ? 'nav-item nav-item--active' : 'nav-item'}
        aria-label="Home"
      >
        <svg aria-hidden="true" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
        </svg>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/income/add"
        className={({ isActive }) => isActive ? 'nav-item nav-item--active' : 'nav-item'}
        aria-label="Add Income"
      >
        <svg aria-hidden="true" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span>Income</span>
      </NavLink>

      <NavLink
        to="/goal"
        className={({ isActive }) => isActive ? 'nav-item nav-item--active' : 'nav-item'}
        aria-label="Goal Progress"
      >
        <svg aria-hidden="true" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        </svg>
        <span>Goal</span>
      </NavLink>

      <NavLink
        to="/news"
        className={({ isActive }) => isActive ? 'nav-item nav-item--active' : 'nav-item'}
        aria-label="Financial News"
      >
        <svg aria-hidden="true" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h4" />
        </svg>
        <span>News</span>
      </NavLink>

    </nav>
  )
}
