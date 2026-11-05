import React from "react";
import { games } from "../data/games.js";
import "../styles/ArenaSection.css";

function ArenaSection() {
  return (
    <section className="arena-promo-section" id="arena-games">
      <div className="arena-promo-container">
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
