import React from "react";
import { games } from "../data/games.js";
import "../styles/Arena.css";

// Main Sports Arena Hub page for STRIVORA
function Arena() {
  return (
    <main className="arena-page">
      <div className="arena-page-container">
        {/* Header Section */}
        <header className="arena-page-header">
          <p className="arena-page-label">STRIVORA GAMING ZONE</p>
          <h1 className="arena-page-title">WELCOME TO THE ARENA</h1>
          <p className="arena-page-description">
            Test your sports knowledge, challenge yourself with real stats, and earn points through interactive challenges.
          </p>
        </header>

        {/* Visual Divider between Header and Cards */}
        <hr className="arena-divider" />

        {/* Games Grid or Empty Fallback */}
        {games && games.length > 0 ? (
          <section className="arena-games-grid" aria-label="STRIVORA Arena Games">
            {games.map((game) => (
              <a
                key={game.id}
                href={game.route}
                className="arena-game-card"
              >
                <div className="arena-card-content">
                  <h2 className="arena-card-title">{game.name}</h2>
                  <p className="arena-card-description">{game.description}</p>
                  <p className="arena-card-instructions">{game.instructions}</p>
                </div>
                <div className="arena-card-footer">
                  <span className="arena-card-btn">
                    {game.buttonText} &rarr;
                  </span>
                </div>
              </a>
            ))}
          </section>
        ) : (
          <p className="arena-empty-message">
            No games available right now. Please check back later.
          </p>
        )}
      </div>
    </main>
  );
}

export default Arena;
