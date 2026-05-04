import { Link } from 'react-router-dom'

export function LegalFooter() {
  return (
    <footer className="legal-footer">
      <Link to="/cookies">Cookie Policy</Link>
      <span className="legal-footer-sep" aria-hidden="true">·</span>
      <Link to="/privacy">Privacy Policy</Link>
      <span className="legal-footer-sep" aria-hidden="true">·</span>
      <Link to="/terms">Terms &amp; Conditions</Link>
    </footer>
  )
}
