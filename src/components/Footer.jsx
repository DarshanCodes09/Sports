import React from "react";
import "../styles/Footer.css";

// SPORTSVERSE — Editorial Footer Component
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="sportsverse-footer">
      {/* Subtle ambient lighting */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      <div className="sportsverse-footer-container">
        {/* 4-Column Editorial Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Tagline */}
          <div className="footer-brand-col">
            <a href="/" className="footer-brand-logo">
              SPORTSVERSE<span className="footer-brand-dot">.</span>
            </a>
            <span className="footer-brand-tagline">SPORTS BEYOND BORDERS</span>
            <p className="footer-brand-desc">
              An editorial sports odyssey connecting global cultures, iconic rivalries, statistical records, and interactive gaming challenges across world sports.
            </p>
            <div className="footer-brand-badges">
              <span className="footer-badge-pill">Global Coverage</span>
              <span className="footer-badge-pill">Live Arena</span>
              <span className="footer-badge-pill">Editorial 2026</span>
            </div>
          </div>

          {/* Column 2: Explore Sports */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Explore Sports</h4>
            <ul className="footer-link-list">
              <li>
                <a href="/leagues" className="footer-link">Cricket Leagues</a>
              </li>
              <li>
                <a href="/football/leagues" className="footer-link">Football Hub</a>
              </li>
              <li>
                <a href="/arena/stats-challenge" className="footer-link">Basketball Stats</a>
              </li>
              <li>
                <a href="/arena/quiz" className="footer-link">Volleyball World</a>
              </li>
              <li>
                <a href="/football/standings" className="footer-link">Standings & Tables</a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Gaming Arena */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">The Arena</h4>
            <ul className="footer-link-list">
              <li>
                <a href="/arena/quiz" className="footer-link">Sports Quiz</a>
              </li>
              <li>
                <a href="/arena/flag-challenge" className="footer-link">Flag Challenge</a>
              </li>
              <li>
                <a href="/arena/guess-player" className="footer-link">Guess the Player</a>
              </li>
              <li>
                <a href="/arena/stats-challenge" className="footer-link">Stats Challenge</a>
              </li>
              <li>
                <a href="/arena" className="footer-link">All Arena Games</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Players */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Platform</h4>
            <ul className="footer-link-list">
              <li>
                <a href="/players" className="footer-link">Player Universe</a>
              </li>
              <li>
                <a href="/countries" className="footer-link">Global Countries</a>
              </li>
              <li>
                <a href="/#hero" className="footer-link">Editorial Story</a>
              </li>
              <li>
                <a href="/#explore-sports" className="footer-link">Explore Sports</a>
              </li>
              <li>
                <a href="/#find-game" className="footer-link">Find Your Game</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Sublinks, and Back-to-Top */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; 2026 <span className="footer-copyright-highlight">SPORTSVERSE</span>. Sports Beyond Borders. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="/#hero" className="footer-sublink">Overview</a>
            <a href="/arena" className="footer-sublink">Arena Hub</a>
            <a href="/players" className="footer-sublink">Players</a>
          </div>

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

      {/* Crimson Accent Ribbon on Bottom Right */}
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
            opacity="0.8"
          />
        </svg>
      </div>
    </footer>
  );
}

export default Footer;
