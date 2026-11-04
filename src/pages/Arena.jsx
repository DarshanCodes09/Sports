import React, { useState, useEffect } from "react";
import { games } from "../data/games.js";
import { getArenaData } from "../utils/arenaStorage.js";
import "../styles/Arena.css";

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
      <div className="arena-page-container">
        <header className="arena-page-header">
          <p className="arena-page-label">STRIVORA GAMING ZONE</p>
          <h1 className="arena-page-title">WELCOME TO THE ARENA</h1>
          <p className="arena-page-description">
            Test your sports knowledge, challenge yourself with real stats, and earn points through interactive challenges.
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
