import { Link } from 'react-router-dom'
import { LegalFooter } from '../components/LegalFooter'

export function PrivacyPolicy() {
  return (
    <div className="legal-page-shell">
      <main className="legal-page" id="main-content">
        <article>
          <header>
            <h1>Privacy Policy</h1>
            <p className="legal-updated">Last updated: April 28, 2026</p>
          </header>

          <section aria-labelledby="info-collect">
            <h2 id="info-collect">Information We Collect</h2>
            <p>
              When you create an account, we collect your name and email address. When you use
              PayCycle, you voluntarily enter income and allocation data. We do not collect
              payment information or link to your bank accounts.
            </p>
          </section>

          <section aria-labelledby="how-use-info">
            <h2 id="how-use-info">How We Use Your Information</h2>
            <p>
              Your information is used solely to provide the PayCycle allocation service — to
              show you your balance, spending categories, and savings goal progress. We do not
              sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section aria-labelledby="data-storage">
            <h2 id="data-storage">Data Storage</h2>
            <p>
              Your data is stored securely using Supabase, a cloud database platform. All data
              is encrypted in transit (HTTPS/TLS) and at rest. We use Supabase Row Level
              Security (RLS) to ensure that each user can only access their own data.
            </p>
          </section>

          <section aria-labelledby="third-party">
            <h2 id="third-party">Third-Party Services</h2>
            <ul>
              <li>
                <strong>Supabase</strong> — Handles authentication and database storage. Their
                privacy policy is available at supabase.com/privacy.
              </li>
              <li>
                <strong>Google Analytics</strong> — Used to collect anonymous usage statistics
                (pages viewed, session duration). No personally identifiable information is sent
                to Google Analytics.
              </li>
            </ul>
          </section>

          <section aria-labelledby="your-rights">
            <h2 id="your-rights">Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p>
              To exercise any of these rights, email{' '}
              <a href="mailto:hbsaine@gmail.com">hbsaine@gmail.com</a>.
            </p>
          </section>

          <section aria-labelledby="data-retention">
            <h2 id="data-retention">Data Retention</h2>
            <p>
              We retain your data for as long as your account is active. If you delete your
              account, your personal data will be removed within 30 days. Anonymized analytics
              data may be retained longer for aggregate reporting purposes.
            </p>
          </section>

          <section aria-labelledby="policy-changes">
            <h2 id="policy-changes">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make significant
              changes, we will notify you by updating the "Last updated" date at the top of
              this page. Continued use of PayCycle after changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact">Contact</h2>
            <p>
              Questions about your privacy? Email{' '}
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
