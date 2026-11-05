import React, { useState } from "react";

// SPORTSVERSE Navigation Bar Component
function Navbar({ currentPath = "/" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/players?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Nav links: Home, Explore, Cricket, Football, Basketball, Volleyball
  const navLinks = [
    { label: "Home", href: "/", active: currentPath === "/" },
    { label: "Explore", href: "/#find-game", active: currentPath === "/#find-game" },
    { label: "Cricket", href: "/leagues", active: currentPath.startsWith("/leagues") || currentPath.startsWith("/countries") },
    { label: "Football", href: "/football/leagues", active: currentPath.startsWith("/football") },
    { label: "Basketball", href: "/arena/stats-challenge", active: currentPath === "/arena/stats-challenge" },
    { label: "Volleyball", href: "/arena/quiz", active: currentPath === "/arena/quiz" },
  ];

  return (
    <nav className="sportsverse-navbar" aria-label="Main Navigation">
      <div className="sportsverse-nav-container">
        {/* Brand Logo & Tagline */}
        <a href="/" className="sportsverse-brand-group">
          <span className="sportsverse-logo">
            SPORTSVERSE<span className="sportsverse-logo-dot">.</span>
          </span>
          <span className="sportsverse-tagline">SPORTS BEYOND BORDERS</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="sportsverse-nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`sportsverse-nav-link ${link.active ? "active" : ""}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Utility: Search, Profile & Mobile Toggle */}
        <div className="sportsverse-nav-actions">
          <form className="sportsverse-nav-search" onSubmit={handleSearchSubmit}>
            <svg
              className="sportsverse-search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search players, teams, leagues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search players, teams, leagues"
            />
          </form>

          {/* Profile button on the right */}
          <a
            href="/profile"
            className={`strivora-profile-btn ${currentPath === "/profile" ? "active" : ""}`}
          >
            Profile
          </a>

          {/* Arena Hub User Icon */}
          <a
            href="/arena"
            className="sportsverse-user-btn"
            title="Sports Arena Hub"
            aria-label="User Profile & Arena Hub"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="sportsverse-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sportsverse-mobile-menu">
          <ul className="sportsverse-mobile-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="sportsverse-mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/profile"
                className="sportsverse-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/arena"
                className="sportsverse-mobile-link highlight"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sports Arena Hub &rarr;
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
