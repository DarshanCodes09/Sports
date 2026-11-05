import React from "react";
import { games } from "../data/games.js";
import "../styles/ArenaSection.css";

// Minimalist line-art icons and soft organic auras matching Reference Image 1
const GAME_VISUALS = {
  1: {
    // Sports Quiz
    auraColor: "rgba(180, 160, 130, 0.22)",
    tagline: "Trivia. Speed. Sports Mastery.",
    icon: (
      <svg
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 10 H34 V22 C34 27.5 29.5 32 24 32 C18.5 32 14 27.5 14 22 Z" />
        <path d="M14 14 H8 C6.9 14 6 14.9 6 16 C6 20.4 9.6 24 14 24" />
        <path d="M34 14 H40 C41.1 14 42 14.9 42 16 C42 20.4 38.4 24 34 24" />
        <path d="M24 32 V40" />
        <path d="M16 40 H32" />
        <circle cx="24" cy="20" r="2.5" fill="#C9233B" stroke="none" />
      </svg>
    ),
  },
  2: {
    // Flag Challenge
    auraColor: "rgba(220, 145, 120, 0.25)",
    tagline: "Flags. Emblems. Club Crests.",
    icon: (
      <svg
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 8 V42" />
        <path
          d="M12 10 C18 7 24 13 32 10 C36 8.5 38 9.5 38 9.5 V26 C38 26 35 25 32 26 C24 29 18 23 12 26"
          fill="rgba(201, 35, 59, 0.12)"
        />
        <circle cx="12" cy="8" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="25" cy="18" r="2.5" fill="#C9233B" stroke="none" />
      </svg>
    ),
  },
  3: {
    // Guess the Player
    auraColor: "rgba(120, 150, 135, 0.25)",
    tagline: "Scouting. Clues. Legends.",
    icon: (
      <svg
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 12 L10 18 L15 23 L18 20 V38 H30 V20 L33 23 L38 18 L32 12 C29 15 19 15 16 12 Z" />
        <circle cx="24" cy="26" r="2.5" fill="#C9233B" stroke="none" />
        <circle cx="24" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  4: {
    // Stats Challenge
    auraColor: "rgba(140, 165, 150, 0.25)",
    tagline: "Records. Milestones. Numbers.",
    icon: (
      <svg
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="40" x2="40" y2="40" />
        <rect x="12" y="24" width="6" height="16" rx="2" fill="rgba(16, 35, 31, 0.1)" />
        <rect x="21" y="16" width="6" height="24" rx="2" fill="rgba(16, 35, 31, 0.1)" />
        <rect x="30" y="8" width="6" height="32" rx="2" fill="rgba(201, 35, 59, 0.18)" />
        <circle cx="33" cy="8" r="2.5" fill="#C9233B" stroke="none" />
        <path d="M10 28 L20 18 L28 22 L38 8" stroke="#C9233B" strokeWidth="1.8" strokeDasharray="2 3" />
      </svg>
    ),
  },
};

// SPORTSVERSE Arena Section on Homepage
function ArenaSection() {
  return (
    <section className="arena-promo-section" id="arena-games">
      <div className="arena-promo-container">
        {/* Editorial Section Header */}
        <div className="arena-promo-header">
          <div className="arena-promo-kicker-row">
            <span className="arena-promo-kicker-num">02</span>
            <span className="arena-promo-kicker-dash"></span>
            <span className="arena-promo-tag">PLAY. COMPETE. LEARN.</span>
          </div>
          <h2 className="arena-promo-title">
            SPORTSVERSE <span className="serif-crimson-italic">ARENA</span>
          </h2>
          <p className="arena-promo-description">
            Four interactive sports games connecting fans worldwide. Challenge your knowledge with trivia, national flags, player clues, and record statistics.
          </p>
          <a href="/arena" className="arena-promo-btn">
            Enter Arena Hub &rarr;
          </a>
        </div>

        {/* 4 Interactive Game Cards Grid */}
        <div className="arena-promo-grid">
          {games.map((game) => {
            const visual = GAME_VISUALS[game.id] || GAME_VISUALS[1];
            return (
              <a
                key={game.id}
                href={game.route}
                className="arena-promo-card"
              >
                {/* Organic Aura Shape & Minimalist Line Art */}
                <div className="arena-promo-aura-wrapper">
                  <div
                    className="arena-promo-aura-shape"
                    style={{ backgroundColor: visual.auraColor }}
                    aria-hidden="true"
                  />
                  <div className="arena-promo-icon">{visual.icon}</div>
                  <div className="arena-promo-orbital-arc" aria-hidden="true" />
                </div>

                <div className="arena-promo-content">
                  <span className="arena-promo-badge">CHALLENGE 0{game.id}</span>
                  <h3 className="arena-promo-card-title">{game.name}</h3>
                  <p className="arena-promo-tagline">{visual.tagline}</p>
                  <p className="arena-promo-card-desc">{game.description}</p>
                </div>

                {/* Circular Arrow Button (Ref 1) */}
                <div className="arena-promo-card-footer">
                  <span className="arena-promo-card-btn-text">
                    {game.buttonText}
                  </span>
                  <span
                    className="arena-promo-circle-btn"
                    aria-label={`Play ${game.name}`}
                  >
                    &rarr;
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ArenaSection;
