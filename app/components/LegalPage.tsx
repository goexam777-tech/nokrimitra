import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="logo">
            <span className="logo-mark">NM</span>
            <span className="logo-name">
              <span className="logo-word">
                Nokri<span className="logo-accent">Mitra</span>
                <span className="logo-tld">.in</span>
              </span>
              <span className="logo-tag">GSRTC કંડક્ટર તૈયારી</span>
            </span>
          </a>
          <nav className="nav">
            <a className="nav-link" href="/">
              હોમ
            </a>
            <a className="header-buy" href="/#buy">
              ખરીદો ₹120
            </a>
          </nav>
        </div>
      </header>

      <main className="legal-main">
        <div className="container" style={{ maxWidth: "820px" }}>
          <h1 className="legal-title">{title}</h1>
          {updated ? <p className="legal-updated">છેલ્લે અપડેટ: {updated}</p> : null}
          <div className="legal-content">{children}</div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
