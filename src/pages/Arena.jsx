import React, { useState, useEffect } from "react";
import { games } from "../data/games.js";
import { getArenaData } from "../utils/arenaStorage.js";
import "../styles/Arena.css";

// Visual metadata for the 4 Arena Challenges matching Reference Image 1
const GAME_VISUALS = {
  1: {
    // Sports Quiz
    auraColor: "rgba(180, 160, 130, 0.28)",
    accentDot: "#C9233B",
    tagline: "Trivia. Speed. Sports Mastery.",
    icon: (
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
  2: {
    // Flag Challenge
    auraColor: "rgba(220, 145, 120, 0.28)",
    accentDot: "#C9233B",
    tagline: "Flags. Emblems. Club Crests.",
    icon: (
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
  3: {
    // Guess the Player
    auraColor: "rgba(120, 150, 135, 0.28)",
    accentDot: "#0B3B33",
    tagline: "Scouting. Clues. Legends.",
    icon: (
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
  4: {
    // Stats Challenge
    auraColor: "rgba(140, 165, 150, 0.28)",
    accentDot: "#C9233B",
    tagline: "Records. Milestones. Numbers.",
    icon: (
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
};

function Arena() {
  const [arenaData, setArenaData] = useState({
    totalXp: 0,
    gamesPlayed: 0,
    totalCorrect: 0,
    totalWrong: 0,
    bestScores: {},
    history: []
  });

  useEffect(() => {
    setArenaData(getArenaData());
  }, []);

  // Calculate overall answer accuracy
  const totalAnswers = arenaData.totalCorrect + arenaData.totalWrong;
  const accuracy =
    totalAnswers > 0
      ? Math.round((arenaData.totalCorrect / totalAnswers) * 100)
      : 0;

  return (
    <main className="arena-page">
      {/* Background delicate orbital geometry inspired by Reference 1 */}
      <div className="arena-orbits" aria-hidden="true">
        <svg
          className="arena-orbit-svg"
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

      <div className="arena-page-container">
        {/* Editorial Header Section */}
        <header className="arena-page-header">
          <div className="arena-kicker-row">
            <span className="arena-kicker-num">02</span>
            <span className="arena-kicker-dash"></span>
            <span className="arena-kicker-text">THE GAMES WE LOVE</span>
          </div>
          <h1 className="arena-page-title">
            SPORTSVERSE <span className="serif-crimson-italic">ARENA</span>
          </h1>
          <p className="arena-page-description">
            Four premier sporting challenges. Test your sports trivia, identify national flags & club crests, scout iconic players, and master sports statistics.
          </p>
        </header>

        {/* Player Stats Bar */}
        <section className="arena-stats-summary" aria-label="Player Arena Progress">
          <div className="arena-stat-box">
            <span className="arena-stat-title">Total XP</span>
            <span className="arena-stat-num xp">{arenaData.totalXp}</span>
          </div>
          <div className="arena-stat-box">
            <span className="arena-stat-title">Games Played</span>
            <span className="arena-stat-num">{arenaData.gamesPlayed}</span>
          </div>
          <div className="arena-stat-box">
            <span className="arena-stat-title">Accuracy</span>
            <span className="arena-stat-num">{accuracy}%</span>
          </div>
          <div className="arena-stat-box">
            <span className="arena-stat-title">Correct Answers</span>
            <span className="arena-stat-num correct">{arenaData.totalCorrect}</span>
          </div>
        </section>

        <hr className="arena-divider" />

        {/* Game Cards Grid */}
        {games && games.length > 0 ? (
          <section className="arena-games-grid" aria-label="STRIVORA Arena Games">
            {games.map((game) => {
              const bestScore = arenaData.bestScores[game.name] || 0;
              return (
                <a
                  key={game.id}
                  href={game.route}
                  className="arena-game-card"
                >
                  <div className="arena-card-content">
                    <h2 className="arena-card-title">{game.name}</h2>
                    <p className="arena-card-description">{game.description}</p>
                    <p className="arena-card-instructions">{game.instructions}</p>
                    {arenaData.gamesPlayed > 0 && (
                      <p className="arena-card-best">
                        Best Score: <strong>{bestScore}</strong>
                      </p>
                    )}
                  </div>
                  <div className="arena-card-footer">
                    <span className="arena-card-btn">
                      {game.buttonText}
                    </span>
                  </div>
                </a>
              );
            })}
          </section>
        ) : (
          <p className="arena-empty-message">
            No games available right now. Please check back later.
          </p>
        )}

        {/* Recent Game History */}
        {arenaData.history && arenaData.history.length > 0 && (
          <section className="arena-history-section">
            <h2 className="arena-history-title">Recent Game History</h2>
            <div className="arena-history-list">
              {arenaData.history.map((item) => (
                <div key={item.id} className="arena-history-item">
                  <div className="arena-history-info">
                    <span className="arena-history-game">{item.gameName}</span>
                    <span className="arena-history-date">{item.date}</span>
                  </div>
                  <div className="arena-history-stats">
                    <span className="arena-history-score">Score: {item.score}</span>
                    <span className="arena-history-xp">+{item.xpEarned} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Arena;
