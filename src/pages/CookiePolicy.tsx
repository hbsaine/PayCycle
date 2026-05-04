import { Link } from 'react-router-dom'
import { LegalFooter } from '../components/LegalFooter'

export function CookiePolicy() {
  return (
    <div className="legal-page-shell">
      <main className="legal-page" id="main-content">
        <article>
          <header>
            <h1>Cookie Policy</h1>
            <p className="legal-updated">Last updated: April 28, 2026</p>
          </header>

          <section aria-labelledby="what-cookies">
            <h2 id="what-cookies">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They
              help websites remember your preferences, keep you logged in, and understand how you
              interact with the site.
            </p>
          </section>

          <section aria-labelledby="how-we-use">
            <h2 id="how-we-use">How PayCycle Uses Cookies</h2>
            <p>
              PayCycle uses cookies to manage your login session, remember your preferences, and
              gather anonymous analytics data so we can continue improving the app. We do not use
              cookies to track you across other websites or sell your data to third parties.
            </p>
          </section>

          <section aria-labelledby="types-cookies">
            <h2 id="types-cookies">Types of Cookies We Use</h2>
            <ul>
              <li>
                <strong>Essential cookies</strong> — Required for the app to function. These
                handle authentication and session management. You cannot opt out of these while
                using PayCycle.
              </li>
              <li>
                <strong>Analytics cookies</strong> — Help us understand how users navigate the
                app so we can improve the experience. Data is collected anonymously.
              </li>
              <li>
                <strong>Preference cookies</strong> — Remember settings you have chosen, such
                as your cookie consent choice stored in your browser's local storage.
              </li>
            </ul>
          </section>

          <section aria-labelledby="manage-cookies">
            <h2 id="manage-cookies">How to Manage Cookies</h2>
            <p>
              You can control and delete cookies through your browser settings. Most browsers
              allow you to refuse cookies, delete existing cookies, or be notified when a cookie
              is set. Note that disabling essential cookies may prevent PayCycle from working
              correctly.
            </p>
            <p>
              You can also use the Accept / Decline banner shown on your first visit to control
              non-essential cookies within PayCycle.
            </p>
          </section>

          <section aria-labelledby="cookie-contact">
            <h2 id="cookie-contact">Contact</h2>
            <p>
              Questions? Email{' '}
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
