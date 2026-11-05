import React, { useState } from "react";

// SECTION 03 — LIVE NOW / LIVE MATCHES
// Pixel-perfect recreation of Reference Image 1
function LiveNowSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterOptions = ["All", "Cricket", "Football", "Basketball", "Volleyball"];

  // 4 Live Matches directly matching Reference Image 1
  const matches = [
    {
      id: "cricket-ipl",
      sport: "Cricket",
      tournament: "IPL",
      status: "LIVE",
      isLiveBadge: true,
      team1: { name: "MI", score: "184/4", overs: "(18.2)" },
      team2: { name: "CSK", score: "176/6", overs: "(20)" },
      footerNote: "Mumbai Indians lead by 8 runs",
      link: "/leagues",
      icon: (
        // Cricket stumps & bails line icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="4" x2="6" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="18" y1="4" x2="18" y2="20" />
          <line x1="4" y1="4" x2="20" y2="4" />
        </svg>
      ),
    },
    {
      id: "football-epl",
      sport: "Football",
      tournament: "Premier League",
      status: "72'",
      isLiveBadge: false,
      team1: { name: "Man City", score: "2" },
      team2: { name: "Arsenal", score: "1" },
      footerNote: "2nd Half",
      link: "/football/leagues",
      icon: (
        // Soccer ball line icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12,7 16,10 14.5,15 9.5,15 8,10" fill="rgba(244, 235, 221, 0.1)" />
          <line x1="12" y1="7" x2="12" y2="2" />
          <line x1="16" y1="10" x2="21" y2="8" />
          <line x1="14.5" y1="15" x2="18" y2="21" />
          <line x1="9.5" y1="15" x2="6" y2="21" />
          <line x1="8" y1="10" x2="3" y2="8" />
        </svg>
      ),
    },
    {
      id: "basketball-nba",
      sport: "Basketball",
      tournament: "NBA",
      status: "Q4 4:21",
      isLiveBadge: false,
      team1: { name: "Lakers", score: "98" },
      team2: { name: "Warriors", score: "102" },
      footerNote: "4th Quarter",
      link: "/arena/stats-challenge",
      icon: (
        // Basketball lines icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M4.93 4.93c4.24 4.24 4.24 11.1 0 15.34" />
          <path d="M19.07 4.93c-4.24 4.24-4.24 11.1 0 15.34" />
        </svg>
      ),
    },
    {
      id: "volleyball-vnl",
      sport: "Volleyball",
      tournament: "VNL",
      status: "Set 4",
      isLiveBadge: false,
      team1: { name: "India", score: "2" },
      team2: { name: "Brazil", score: "1" },
      footerNote: "Set 4 - India leads",
      link: "/arena/quiz",
      icon: (
        // Volleyball panels icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20" />
          <path d="M2 12a14.5 14.5 0 0 0 20 0" />
        </svg>
      ),
    },
  ];

  const filteredMatches =
    activeFilter === "All"
      ? matches
      : matches.filter((m) => m.sport.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="sportsverse-live-matches" id="live-matches">
      <div className="live-matches-container">
        {/* Section Header (Ref 1) */}
        <div className="live-matches-header">
          <div className="live-header-left">
            <div className="live-kicker-row">
              <span className="live-kicker-num">04</span>
              <span className="live-kicker-dash"></span>
              <span className="live-pulse-badge">
                <span className="live-pulse-dot" />
                LIVE NOW
              </span>
            </div>
            <h2 className="live-matches-heading">
              Live <span className="serif-crimson-italic">Matches</span>
            </h2>
          </div>

          <div className="live-header-right">
            <p className="live-aside-text">
              Follow the action.<br />
              Stay in the game.
            </p>
            <a href="/football/standings" className="btn-view-matches">
              View All Matches &rarr;
            </a>
          </div>
        </div>

        {/* Sport Filtering Tabs (Ref 1) */}
        <div className="live-filter-tabs" role="tablist" aria-label="Sport filter tabs">
          {filterOptions.map((sport) => {
            const isActive = activeFilter === sport;
            return (
              <button
                key={sport}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`live-filter-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveFilter(sport)}
              >
                {sport}
              </button>
            );
          })}
        </div>

        {/* 4 Match Columns Grid matching Reference Image 1 */}
        <div className="live-matches-grid">
          {filteredMatches.map((m) => (
            <a key={m.id} href={m.link} className="live-match-column">
              {/* Top Header of Match Column */}
              <div className="match-col-header">
                <div className="match-col-sport-meta">
                  <span className="match-col-icon">{m.icon}</span>
                  <div className="match-col-names">
                    <span className="match-sport-title">{m.sport.toUpperCase()}</span>
                    <span className="match-league-title">{m.tournament}</span>
                  </div>
                </div>
                {m.isLiveBadge ? (
                  <span className="match-live-tag">LIVE</span>
                ) : (
                  <span className="match-status-tag">{m.status}</span>
                )}
              </div>

              {/* Teams & Scores */}
              <div className="match-teams-list">
                <div className="match-team-row">
                  <div className="match-team-left">
                    <span className="team-circle-badge" aria-hidden="true" />
                    <span className="match-team-name">{m.team1.name}</span>
                  </div>
                  <div className="match-team-right">
                    <span className="match-team-score">{m.team1.score}</span>
                    {m.team1.overs && (
                      <span className="match-team-overs">{m.team1.overs}</span>
                    )}
                  </div>
                </div>

                <div className="match-team-row">
                  <div className="match-team-left">
                    <span className="team-circle-badge" aria-hidden="true" />
                    <span className="match-team-name">{m.team2.name}</span>
                  </div>
                  <div className="match-team-right">
                    <span className="match-team-score">{m.team2.score}</span>
                    {m.team2.overs && (
                      <span className="match-team-overs">{m.team2.overs}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Note & Circular Arrow Button */}
              <div className="match-col-footer">
                <span className="match-footer-note">{m.footerNote}</span>
                <span className="match-circle-arrow-btn" aria-label={`View ${m.team1.name} vs ${m.team2.name}`}>
                  &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Organic Wave Transition to Footer */}
      <div className="live-to-footer-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,25 C340,75 720,0 1100,60 C1280,85 1380,35 1440,30 L1440,90 L0,90 Z"
            fill="#031F1B"
          />
          <path
            d="M0,20 C360,70 740,-5 1120,55 C1300,80 1400,30 1440,25"
            stroke="rgba(201, 35, 59, 0.45)"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}

export default LiveNowSection;
