import React, { useState } from "react";

// SECTION 02 — EXPLORE OUR SPORTS
// Implements Reference Image 2's 4 photographic sports cards, integrated with the sports editorial palette.
function ExploreSportsSection() {
  const [activeHover, setActiveHover] = useState(null);

  const sportsList = [
    {
      id: "cricket",
      name: "Cricket",
      subtitle: "Leagues · Teams · Players",
      tagline: "Tradition, masterclasses, and electrifying rivalries across the gentleman's game.",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop",
      backupBg: "linear-gradient(135deg, #0b3b33 0%, #031f1b 100%)",
      destination: "/leagues",
      icon: (
        // Cricket Bat line icon
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4l6 6-9 9-6-6 9-9z" />
          <line x1="3" y1="21" x2="7" y2="17" />
          <circle cx="18" cy="18" r="3" />
        </svg>
      ),
    },
    {
      id: "football",
      name: "Football",
      subtitle: "Leagues · Teams · Players",
      tagline: "The world's game connecting continents through iconic leagues and derbies.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
      backupBg: "linear-gradient(135deg, #062b25 0%, #031f1b 100%)",
      destination: "/football/leagues",
      icon: (
        // Soccer Ball line icon
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
    {
      id: "basketball",
      name: "Basketball",
      subtitle: "Leagues · Teams · Players",
      tagline: "High-flying rim attacks, court vision, and clutch shooting on hardwood.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
      backupBg: "linear-gradient(135deg, #0b3b33 0%, #172a24 100%)",
      destination: "/arena/stats-challenge",
      icon: (
        // Basketball minimal line icon
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M4.93 4.93c4.24 4.24 4.24 11.1 0 15.34" />
          <path d="M19.07 4.93c-4.24 4.24-4.24 11.1 0 15.34" />
        </svg>
      ),
    },
    {
      id: "volleyball",
      name: "Volleyball",
      subtitle: "Leagues · Teams · Players",
      tagline: "Gravity-defying vertical spikes, lightning digs, and court synergy.",
      image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop",
      backupBg: "linear-gradient(135deg, #062b25 0%, #0c332b 100%)",
      destination: "/arena/quiz",
      icon: (
        // Volleyball minimal line icon
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 10 10" />
          <path d="M12 22a10 10 0 0 1-10-10" />
          <path d="M7.05 7.05a7 7 0 0 1 9.9 0" />
        </svg>
      ),
    },
  ];

  return (
    <section className="sportsverse-explore-sports" id="explore-sports">
      <div className="explore-container">
        {/* Section Header */}
        <div className="explore-header">
          <div className="explore-header-left">
            <div className="explore-kicker-row">
              <span className="explore-kicker-num">02</span>
              <span className="explore-kicker-dash"></span>
              <span className="explore-kicker">FOUR WORLDS. COUNTLESS STORIES.</span>
            </div>
            <h2 className="explore-title">
              Explore Our <span className="serif-crimson-italic">Sports</span>
            </h2>
          </div>
        </div>

        {/* 4 Large Photographic Cards Grid (Ref 2 layout in Ref 1 theme) */}
        <div className="explore-cards-grid">
          {sportsList.map((sport) => {
            const isHovered = activeHover === sport.id;
            return (
              <a
                key={sport.id}
                href={sport.destination}
                className={`explore-photo-card ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => setActiveHover(sport.id)}
                onMouseLeave={() => setActiveHover(null)}
                style={{ background: sport.backupBg }}
              >
                {/* Full-bleed Photo with Smooth Zoom */}
                <div className="photo-card-media">
                  <img
                    src={sport.image}
                    alt={`${sport.name} action shot`}
                    className="photo-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* Refined Dark Forest Gradient Overlay */}
                  <div className="photo-card-overlay" />
                </div>

                {/* Top Badge Icon in Frosted Pill */}
                <div className="photo-card-top">
                  <div className="sport-badge-icon" aria-hidden="true">
                    {sport.icon}
                  </div>
                  <span className="photo-card-arrow">&rarr;</span>
                </div>

                {/* Card Editorial Content Bottom */}
                <div className="photo-card-bottom">
                  <h3 className="photo-card-name">{sport.name}</h3>
                  <p className="photo-card-sub">{sport.subtitle}</p>
                  <p className="photo-card-desc">{sport.tagline}</p>
                </div>

                {/* Crimson Accent Hover Border Glow */}
                <div className="photo-card-glow-border" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Organic Curved Wave Transition from Deep Forest Green into Warm Ivory/Cream (Ref 1) */}
      <div className="explore-to-ivory-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Echoing decorative thin lines */}
          <path
            d="M0,45 C360,10 720,85 1100,25 C1260,-5 1380,35 1440,50"
            stroke="rgba(201, 35, 59, 0.4)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0,65 C340,25 700,105 1080,45 C1240,15 1360,55 1440,70"
            stroke="rgba(156, 170, 161, 0.25)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Main Ivory/Cream Flowing Organic Body */}
          <path
            d="M0,85 C320,40 680,120 1060,60 C1220,30 1360,75 1440,90 L1440,120 L0,120 Z"
            fill="#F4EBDD"
          />
        </svg>
      </div>
    </section>
  );
}

export default ExploreSportsSection;
