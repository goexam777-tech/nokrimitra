export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-block">
            <a href="/" className="logo footer-logo">
              <span className="logo-mark">NM</span>
              <span className="logo-name">
                <span className="logo-word">
                  Nokri<span className="logo-accent">Mitra</span>
                  <span className="logo-tld">.in</span>
                </span>
                <span className="logo-tag">GSRTC કંડક્ટર તૈયારી</span>
              </span>
            </a>
            <p className="footer-desc">
              GSRTC કંડક્ટર ભરતી પરીક્ષાની સંપૂર્ણ ગુજરાતી તૈયારી — PDF નોંધ,
              3000+ MCQ અને પ્રેક્ટિસ સેટ.
            </p>
            <a
              className="footer-wa"
              href="https://wa.me/919104826422"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp: +91 91048 26422
            </a>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="/">Home</a>
              <a href="/#buy">Buy PDF Course</a>
              <a href="/#samples">Free Samples</a>
              <a href="/#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="/about">About Us</a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/refund-policy">Refund Policy</a>
              <a href="/terms">Terms &amp; Conditions</a>
              <a href="/disclaimer">Disclaimer</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} NokriMitra.in — All rights reserved. આ
          ખાનગી અભ્યાસ પ્લેટફોર્મ છે, સત્તાવાર GSRTC સાથે સંબંધિત નથી.
        </div>
      </div>
    </footer>
  );
}
