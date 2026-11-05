import React from "react";

// SECTION 05 — FOOTER
// Pixel-perfect recreation of Reference Image 1's sleek editorial footer
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="sportsverse-footer">
      <div className="sportsverse-footer-container">
        {/* Left Brand & Tagline */}
        <div className="sportsverse-footer-brand-side">
          <a href="/" className="sportsverse-footer-logo">
            SPORTSVERSE<span className="sportsverse-logo-dot">.</span>
          </a>
          <span className="sportsverse-footer-tagline-text">
            Sports Beyond Borders.
          </span>
        </div>

        {/* Center / Right Links */}
        <nav className="sportsverse-footer-nav" aria-label="Footer Navigation">
          <a href="/#hero" className="sportsverse-footer-link">About</a>
          <a href="/#find-game" className="sportsverse-footer-link">Explore</a>
          <a href="/arena" className="sportsverse-footer-link">Arena</a>
          <a href="/players" className="sportsverse-footer-link">Universe</a>
        </nav>

        {/* Far Right Floating Circular Back-to-Top Button */}
        <div className="sportsverse-footer-action">
          <button
            type="button"
            className="sportsverse-top-circle-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            title="Back to top"
          >
            &uarr;
          </button>
        </div>
      </div>

      {/* Crimson Wave Accent Ribbon on the Bottom Right (Ref 1) */}
      <div className="footer-crimson-ribbon" aria-hidden="true">
        <svg
          viewBox="0 0 500 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 C180,110 320,60 500,0 L500,120 Z"
            fill="#C9233B"
            opacity="0.9"
          />
        </svg>
      </div>
    </footer>
  );
}

export default Footer;
