import { Link } from 'react-router-dom'
import { LegalFooter } from '../components/LegalFooter'

export function Terms() {
  return (
    <div className="legal-page-shell">
      <main className="legal-page" id="main-content">
        <article>
          <header>
            <h1>Terms &amp; Conditions</h1>
            <p className="legal-updated">Last updated: April 28, 2026</p>
          </header>

          <section aria-labelledby="acceptance">
            <h2 id="acceptance">Acceptance of Terms</h2>
            <p>
              By accessing or using PayCycle, you agree to be bound by these Terms &amp;
              Conditions. If you do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section aria-labelledby="service-desc">
            <h2 id="service-desc">Description of Service</h2>
            <p>
              PayCycle is a personal budgeting tool designed to help college students allocate
              their paychecks across spending categories. PayCycle is not a financial
              institution, registered investment advisor, or licensed financial planner. Nothing
              in this application constitutes financial advice.
            </p>
          </section>

          <section aria-labelledby="user-accounts">
            <h2 id="user-accounts">User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials. Do not share your password with anyone. You are responsible for all
              activity that occurs under your account. Notify us immediately at{' '}
              <a href="mailto:hbsaine@gmail.com">hbsaine@gmail.com</a> if you suspect
              unauthorized access to your account.
            </p>
          </section>

          <section aria-labelledby="acceptable-use">
            <h2 id="acceptable-use">Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use PayCycle for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Use automated scripts or bots to access the service</li>
              <li>Interfere with or disrupt the integrity or performance of the service</li>
            </ul>
          </section>

          <section aria-labelledby="disclaimer">
            <h2 id="disclaimer">Disclaimer</h2>
            <p>
              PayCycle is provided for educational and personal budgeting purposes only. We are
              not licensed financial advisors. The app does not constitute financial, investment,
              tax, or legal advice. Always consult a qualified professional for personalized
              financial guidance.
            </p>
          </section>

          <section aria-labelledby="liability">
            <h2 id="liability">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, PayCycle and its creators shall not be
              liable for any indirect, incidental, special, or consequential damages arising
              from your use of the service, including but not limited to financial decisions
              made based on information displayed in the app.
            </p>
          </section>

          <section aria-labelledby="termination">
            <h2 id="termination">Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to PayCycle at any time,
              with or without notice, if we believe you have violated these Terms &amp;
              Conditions. You may also delete your account at any time by contacting us.
            </p>
          </section>

          <section aria-labelledby="governing-law">
            <h2 id="governing-law">Governing Law</h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of the State of Iowa,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section aria-labelledby="terms-contact">
            <h2 id="terms-contact">Contact</h2>
            <p>
              Questions about these terms? Email{' '}
              <a href="mailto:hbsaine@gmail.com">hbsaine@gmail.com</a>.
            </p>
          </section>
        </article>
      </main>

      <LegalFooter />

      <div className="legal-home-link">
        <Link to="/">&#8592; Back to Home</Link>
      </div>
    </div>
  )
}
