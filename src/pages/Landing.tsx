import { Link } from 'react-router-dom'

const STEPS = [
  {
    number: '1',
    title: 'Enter your paycheck',
    description: 'When you get paid, log the amount in seconds.',
  },
  {
    number: '2',
    title: 'Split it four ways',
    description: 'Allocate across Needs, Wants, Savings, and Investments.',
  },
  {
    number: '3',
    title: 'Watch your goals grow',
    description: 'Track your savings progress and stay on plan.',
  },
]

export function Landing() {
  return (
    <div className="app-shell landing-shell">
      <div className="landing-content">

        {/* ── Hero ── */}
        <section className="landing-hero">
          <span className="logo-wordmark landing-wordmark" aria-label="PayCycle">
            PayCycle
          </span>
          <h1 className="landing-headline">Make every paycheck count.</h1>
          <p className="landing-sub">
            PayCycle helps college students split their income across the four
            categories that matter most: Needs, Wants, Savings, and Investments.
            No bank linking. No complexity. Just a clear plan for every dollar.
          </p>
          <Link to="/login" className="btn btn-primary landing-cta">
            Get Started
          </Link>
        </section>

        {/* ── How It Works ── */}
        <section className="landing-steps" aria-labelledby="how-heading">
          <h2 id="how-heading" className="landing-section-title">
            How it works
          </h2>
          <ol className="steps-list" aria-label="Steps to get started">
            {STEPS.map(({ number, title, description }) => (
              <li key={number} className="step-item">
                <div className="step-number" aria-hidden="true">
                  {number}
                </div>
                <div className="step-body">
                  <p className="step-title">{title}</p>
                  <p className="text-muted text-sm">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Who It's For ── */}
        <section className="landing-who" aria-labelledby="who-heading">
          <h2 id="who-heading" className="landing-section-title">
            Who it's for
          </h2>
          <p className="landing-who-text text-muted text-sm">
            Built for college students who want clarity over their money without
            the headache of full-blown budgeting apps. If you've ever wondered
            where your paycheck went, PayCycle is for you.
          </p>
        </section>

        {/* ── Footer CTA ── */}
        <section className="landing-footer-cta" aria-label="Call to action">
          <p className="landing-footer-tagline">Ready to take control?</p>
          <Link to="/login" className="btn btn-primary landing-cta">
            Get Started
          </Link>
        </section>

      </div>

      {/* ── Attribution footer ── */}
      <footer className="landing-attribution">
        Built by Habib Saine &amp; Sumika Thapa &middot; BAIS 3300 &middot; Spring 2026 &middot; University of Iowa
      </footer>

    </div>
  )
}
