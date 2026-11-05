import React from "react";
import "../styles/FindYourGameSection.css";

// SECTION 03 — THE GAMES WE LOVE / FIND YOUR GAME (SPORTSVERSE ARENA)
// Pixel-perfect implementation of Reference Image 1 / Stitch Screen
// Displays the 4 core Arena Challenges (Sports Quiz, Flag Challenge, Guess the Player, Stats Challenge)
function FindYourGameSection() {
  // 4 ARENA GAMES (Quiz, Flag Challenge, Guess the Player, Stats Challenge)
  const arenaGames = [
    {
      id: "quiz",
      title: "Sports Quiz",
      tagline: "Trivia. Speed. Sports Mastery.",
      badge: "CHALLENGE 01",
      auraColor: "rgba(180, 160, 130, 0.28)",
      accentDot: "#C9233B",
      link: "/arena/quiz",
      icon: (
        // Minimalist Trophy line-art with knowledge spark
        <svg
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#10231F"
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
    {
      id: "flag-challenge",
      title: "Flag Challenge",
      tagline: "Flags. Emblems. Club Crests.",
      badge: "CHALLENGE 02",
      auraColor: "rgba(220, 145, 120, 0.28)",
      accentDot: "#C9233B",
      link: "/arena/flag-challenge",
      icon: (
        // Minimalist Sporting Flag & Crest line-art
        <svg
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#10231F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 8 V42" />
          <path
            d="M12 10 C18 7 24 13 32 10 C36 8.5 38 9.5 38 9.5 V26 C38 26 35 25 32 26 C24 29 18 23 12 26"
            fill="rgba(201, 35, 59, 0.12)"
          />
          <circle cx="12" cy="8" r="2.5" fill="#10231F" stroke="none" />
          <circle cx="25" cy="18" r="2.5" fill="#C9233B" stroke="none" />
        </svg>
      ),
    },
    {
      id: "guess-player",
      title: "Guess the Player",
      tagline: "Scouting. Clues. Legends.",
      badge: "CHALLENGE 03",
      auraColor: "rgba(120, 150, 135, 0.28)",
      accentDot: "#0B3B33",
      link: "/arena/guess-player",
      icon: (
        // Minimalist Scouting Jersey & Athlete line-art
        <svg
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#10231F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 12 L10 18 L15 23 L18 20 V38 H30 V20 L33 23 L38 18 L32 12 C29 15 19 15 16 12 Z" />
          <circle cx="24" cy="26" r="2.5" fill="#C9233B" stroke="none" />
          <circle cx="24" cy="7" r="3" stroke="#10231F" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "stats-challenge",
      title: "Stats Challenge",
      tagline: "Records. Milestones. Numbers.",
      badge: "CHALLENGE 04",
      auraColor: "rgba(140, 165, 150, 0.28)",
      accentDot: "#C9233B",
      link: "/arena/stats-challenge",
      icon: (
        // Minimalist Record Milestone & Trajectory line-art
        <svg
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#10231F"
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
  ];

  return (
    <section className="sportsverse-find-game" id="find-game">
      {/* Background delicate orbital geometry across the ivory canvas (Ref 1) */}
      <div className="find-game-orbits" aria-hidden="true">
        <svg
          className="find-game-orbit-svg"
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50,150 C380,40 680,260 1100,120 C1280,60 1380,180 1420,200"
            stroke="rgba(16, 35, 31, 0.08)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <circle cx="1100" cy="120" r="4" fill="#C9233B" />
          <circle cx="240" cy="90" r="3" fill="#0B3B33" />
        </svg>
      </div>

      <div className="find-game-container">
        {/* Editorial Section Header (Ref 1) */}
        <div className="find-game-header">
          <div className="find-game-title-group">
            <div className="find-game-kicker-row">
              <span className="find-kicker-num">03</span>
              <span className="find-kicker-dash"></span>
              <span className="find-kicker-text">THE GAMES WE LOVE</span>
            </div>
            <h2 className="find-game-heading">
              Find Your <span className="serif-crimson-italic">Game</span>
            </h2>
          </div>

          <div className="find-game-header-aside">
            <p className="find-game-aside-text">
              Four challenges. Countless stories.<br />
              Compete across the Arena hub.
            </p>
            <div className="find-game-nav-arrows" aria-label="Arena navigation">
              <a href="/arena" className="find-arrow-btn prev" aria-label="Arena Hub">
                &larr;
              </a>
              <a href="/arena" className="find-arrow-btn next active" aria-label="Explore Arena">
                &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* 4 Line-Art Illustration Arena Cards matching Reference Image 1 */}
        <div className="find-game-cards-row">
          {arenaGames.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="find-game-card"
            >
              {/* Organic Aura Shape & Minimalist Line Art */}
              <div className="find-card-aura-wrapper">
                <div
                  className="find-card-aura-shape"
                  style={{ backgroundColor: item.auraColor }}
                  aria-hidden="true"
                />
                <div className="find-card-icon">{item.icon}</div>
                {/* Orbital decorative arc around icon */}
                <div className="find-card-orbital-arc" aria-hidden="true" />
              </div>

              {/* Editorial Text */}
              <span className="find-card-badge">{item.badge}</span>
              <h3 className="find-card-title">{item.title}</h3>
              <p className="find-card-tagline">{item.tagline}</p>

              {/* Minimal Circular Arrow Button */}
              <div className="find-card-action">
                <span
                  className="find-card-circle-btn"
                  aria-label={`Launch ${item.title}`}
                >
                  &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Right Watermark */}
        <div className="find-game-watermark">
          <span className="watermark-line"></span>
          <span className="watermark-text">SPORTS BEYOND BORDERS</span>
        </div>
      </div>

      {/* Organic Curved Wave Transition from Ivory/Cream into Deep Forest Green (Ref 1) */}
      <div className="ivory-to-live-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle upper accent stroke */}
          <path
            d="M0,50 C360,110 760,20 1140,95 C1280,120 1380,80 1440,65"
            stroke="rgba(201, 35, 59, 0.45)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0,80 C320,135 680,45 1060,115 C1240,145 1360,95 1440,85"
            stroke="rgba(156, 170, 161, 0.25)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Forest Green Flowing Cut */}
          <path
            d="M0,90 C320,150 720,50 1100,120 C1260,145 1370,105 1440,90 L1440,160 L0,160 Z"
            fill="#062B25"
          />
        </svg>
      </div>
    </section>
  );
}

export default FindYourGameSection;
