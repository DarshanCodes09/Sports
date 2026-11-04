import React, { useState, useEffect } from "react";
import { getArenaData } from "../utils/arenaStorage.js";
import { games } from "../data/games.js";
import "../styles/Profile.css";

// STRIVORA Player Profile Page
function Profile() {
  const [profileData, setProfileData] = useState({
    totalXp: 0,
    gamesPlayed: 0,
    totalCorrect: 0,
    totalWrong: 0,
    bestScores: {},
    history: []
  });

  // Load progress from LocalStorage on component mount
  useEffect(() => {
    setProfileData(getArenaData());
  }, []);

  // Calculate answer accuracy percentage
  const totalAnswers = profileData.totalCorrect + profileData.totalWrong;
  const accuracy =
    totalAnswers > 0
      ? Math.round((profileData.totalCorrect / totalAnswers) * 100)
      : 0;

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <header className="profile-header">
          <p className="profile-label">STRIVORA PLAYER PROFILE</p>
          <h1 className="profile-title">SPORTS ARENA PROFILE</h1>
          <p className="profile-description">
            Track your total XP, game performance, accuracy, and recent match history.
          </p>
        </header>

        {/* If no games have been played yet */}
        {profileData.gamesPlayed === 0 ? (
          <div className="profile-empty-state">
            <h2 className="profile-empty-title">
              No games played yet. Start playing to build your profile.
            </h2>
            <p className="profile-empty-desc">
              Head over to the Sports Arena to play quizzes, guess players, and test your sports knowledge!
            </p>
            <a href="/arena" className="profile-action-btn">
              Go to Sports Arena
            </a>
          </div>
        ) : (
          <>
            {/* Overview Stats Cards */}
            <section className="profile-stats-grid" aria-label="Player Statistics">
              <div className="profile-stat-card">
                <span className="profile-stat-label">Total XP</span>
                <span className="profile-stat-value xp">{profileData.totalXp}</span>
              </div>
              <div className="profile-stat-card">
                <span className="profile-stat-label">Games Played</span>
                <span className="profile-stat-value">{profileData.gamesPlayed}</span>
              </div>
              <div className="profile-stat-card">
                <span className="profile-stat-label">Correct Answers</span>
                <span className="profile-stat-value correct">
                  {profileData.totalCorrect}
                </span>
              </div>
              <div className="profile-stat-card">
                <span className="profile-stat-label">Wrong Answers</span>
                <span className="profile-stat-value wrong">
                  {profileData.totalWrong}
                </span>
              </div>
              <div className="profile-stat-card">
                <span className="profile-stat-label">Accuracy</span>
                <span className="profile-stat-value accuracy">{accuracy}%</span>
              </div>
            </section>

            {/* Best Scores per Game */}
            <section className="profile-section" aria-label="Best Scores">
              <h2 className="profile-section-title">Best Scores by Game</h2>
              <div className="profile-best-grid">
                {games.map((game) => {
                  const best = profileData.bestScores[game.name] || 0;
                  return (
                    <div key={game.id} className="profile-best-card">
                      <div className="profile-best-info">
                        <h3 className="profile-best-name">{game.name}</h3>
                        <p className="profile-best-score">
                          Best Score: <strong>{best}</strong>
                        </p>
                      </div>
                      <a href={game.route} className="profile-play-link">
                        Play
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Recent Match History */}
            <section className="profile-section" aria-label="Recent Game History">
              <h2 className="profile-section-title">Recent Game History</h2>
              {profileData.history && profileData.history.length > 0 ? (
                <div className="profile-history-list">
                  {profileData.history.map((item) => (
                    <div key={item.id} className="profile-history-item">
                      <div className="profile-history-left">
                        <span className="profile-history-game">{item.gameName}</span>
                        <span className="profile-history-date">{item.date}</span>
                      </div>
                      <div className="profile-history-right">
                        <span className="profile-history-score">Score: {item.score}</span>
                        <span className="profile-history-xp">+{item.xpEarned} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="profile-history-empty">No recent games recorded.</p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Profile;

