import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">Go Business</p>

        <nav className="footer__nav" aria-label="Footer navigation">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
        </nav>

        <p className="footer__copyright">© 2024 Go Business</p>
      </div>
    </footer>
  );
}

export default Footer;
