import React from "react";
import "../styles/HeroSection.css";

// SECTION 01 — HERO
// Pixel-perfect match to Reference Image
function HeroSection() {
  const handleScrollToExplore = (e) => {
    e.preventDefault();
    const section = document.getElementById("explore-sports") || document.getElementById("find-game");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="sportsverse-hero" id="hero">
      {/* Background Subtle Gradient & Ambient Glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="hero-container">
        {/* Far Left Vertical Sidebar with Fine Line (Exact Match to Reference Image) */}
        <aside className="hero-sidebar-track" aria-hidden="true">
          <div className="hero-sidebar-line" />
          <div className="hero-sidebar-words">
            <span>PEOPLE</span>
            <span>CULTURES</span>
            <span>RIVALRIES</span>
            <span>MOMENTS</span>
          </div>
        </aside>

        {/* Hero Main Editorial Content */}
        <div className="hero-content">
          {/* Top Kicker */}
          <div className="hero-kicker-row">
            <span className="hero-kicker-number">01</span>
            <span className="hero-kicker-line"></span>
            <span className="hero-kicker-text">FOUR SPORTS. ONE PASSION.</span>
          </div>

          {/* Headline with Playfair Display & Crimson Italic Emphasis */}
          <h1 className="hero-title">
            Every Sport<br />
            Has a <span className="serif-crimson-italic">Story.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            Discover the teams, players, tournaments and moments that make sports unforgettable.
          </p>

          {/* Two Pill CTA Buttons */}
          <div className="hero-actions">
            <a
              href="#explore-sports"
              onClick={handleScrollToExplore}
              className="btn-primary-cream"
            >
              Explore Sports &rarr;
            </a>
            <a href="/arena" className="btn-secondary-outline">
              Discover More
            </a>
          </div>

          {/* Subline below buttons */}
          <div className="hero-subline">
            <span className="hero-subline-dash"></span>
            <p className="hero-subline-text">
              Different games. A shared love for sport.
            </p>
          </div>
        </div>

        {/* Right Side Visual Geometry */}
        <div className="hero-visual" aria-hidden="true">
          {/* Top Right Counter (01 / 04 with up & down chevrons) */}
          <div className="hero-counter-badge">
            <div className="counter-numbers">
              <span className="counter-current">01</span>
              <span className="counter-sep"></span>
              <span className="counter-total">04</span>
            </div>
            <div className="counter-arrows">
              <span>&and;</span>
              <span>&or;</span>
            </div>
          </div>

          {/* Dot Matrix Pattern */}
          <div className="hero-dot-matrix">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="dot-node" />
            ))}
          </div>

          {/* Large Orbital Ellipse with Glowing Crimson Dot on Perimeter */}
          <div className="hero-orbital-wrapper">
            <svg
              className="hero-orbital-svg"
              viewBox="0 0 540 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer delicate orbit ring */}
              <ellipse
                cx="260"
                cy="245"
                rx="235"
                ry="180"
                transform="rotate(-20 260 245)"
                stroke="rgba(244, 235, 221, 0.18)"
                strokeWidth="1.2"
              />
              {/* Inner concentric orbit */}
              <ellipse
                cx="260"
                cy="245"
                rx="180"
                ry="135"
                transform="rotate(12 260 245)"
                stroke="rgba(156, 170, 161, 0.1)"
                strokeWidth="1"
              />
              {/* Glowing Crimson Dot on the Right Perimeter */}
              <circle cx="470" cy="205" r="7" fill="#C9233B" />
              <circle
                cx="470"
                cy="205"
                r="16"
                stroke="#C9233B"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
            </svg>

            {/* Airy Editorial Floating Quote */}
            <div className="hero-editorial-quote">
              <div className="quote-crimson-line" />
              <div className="quote-content">
                <span className="quote-mark">“</span>
                <p className="quote-phrase">
                  More than a game.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOST IMPORTANT — BOTTOM FLOWING ORGANIC WAVE TRANSITION INTO IVORY SECTION */}
      <div className="hero-bottom-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0, 50 C 220, 15, 420, 25, 680, 50 C 940, 75, 1160, 78, 1440, 50 L 1440, 120 L 0, 120 Z"
            fill="#F4EBDD"
          />
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;
