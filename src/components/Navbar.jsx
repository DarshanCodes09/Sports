import React from "react";

// STRIVORA Navigation Bar component
function Navbar({ currentPath = "/" }) {
  return (
    <nav className="strivora-navbar" aria-label="Main Navigation">
      <div className="strivora-nav-container">
        <a href="/" className="strivora-logo">
          STRIVORA<span className="strivora-logo-badge">.</span>
        </a>

        <ul className="strivora-nav-links">
          <li>
            <a
              href="/"
              className={`strivora-nav-link ${currentPath === "/" ? "active" : ""}`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/arena"
              className={`strivora-nav-link ${currentPath === "/arena" ? "active" : ""}`}
            >
              Sports Arena
            </a>
          </li>
          <li>
            <a
              href="/arena/quiz"
              className={`strivora-nav-link ${currentPath === "/arena/quiz" ? "active" : ""}`}
            >
              Quiz
            </a>
          </li>
          <li>
            <a
              href="/arena/flag-challenge"
              className={`strivora-nav-link ${currentPath === "/arena/flag-challenge" ? "active" : ""}`}
            >
              Flags
            </a>
          </li>
          <li>
            <a
              href="/arena/guess-player"
              className={`strivora-nav-link ${currentPath === "/arena/guess-player" ? "active" : ""}`}
            >
              Players
            </a>
          </li>
          <li>
            <a
              href="/arena/stats-challenge"
              className={`strivora-nav-link ${currentPath === "/arena/stats-challenge" ? "active" : ""}`}
            >
              Stats
            </a>
          </li>
        </ul>

        {/* Profile button on the right */}
        <div className="strivora-nav-right">
          <a
            href="/profile"
            className={`strivora-profile-btn ${currentPath === "/profile" ? "active" : ""}`}
          >
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
