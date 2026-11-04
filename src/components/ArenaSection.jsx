import React from "react";
import { games } from "../data/games.js";
import "../styles/ArenaSection.css";

function ArenaSection() {
  return (
    <section className="arena-promo-section">
      <div className="arena-promo-container">
        <div className="arena-promo-header">
          <p className="arena-promo-tag">PLAY. COMPETE. LEARN.</p>
          <h2 className="arena-promo-title">STRIVORA ARENA</h2>
          <p className="arena-promo-description">
            Test your sports knowledge, challenge yourself and earn points through exciting games.
          </p>
          <a href="/arena" className="arena-promo-btn">
            Enter Arena
          </a>
        </div>

        <div className="arena-promo-grid">
          {games.map((game) => (
            <a
              key={game.id}
              href={game.route}
              className="arena-promo-card"
            >
              <h3 className="arena-promo-card-title">{game.name}</h3>
              <p className="arena-promo-card-desc">{game.description}</p>
              <span className="arena-promo-card-link">
                {game.buttonText}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArenaSection;
