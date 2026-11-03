import React from "react";

// STRIVORA Footer component
function Footer() {
  return (
    <footer className="strivora-footer">
      <div className="strivora-footer-container">
        <p className="strivora-footer-text">
          &copy; {new Date().getFullYear()} STRIVORA Sports Platform. All rights reserved.
        </p>
        <div className="strivora-footer-links">
          <a href="/" className="strivora-footer-link">Home</a>
          <a href="/arena" className="strivora-footer-link">Sports Arena</a>
          <a href="/arena/quiz" className="strivora-footer-link">Sports Quiz</a>
          <a href="/arena/flag-challenge" className="strivora-footer-link">Flag Challenge</a>
          <a href="/arena/guess-player" className="strivora-footer-link">Guess the Player</a>
          <a href="/arena/stats-challenge" className="strivora-footer-link">Stats Challenge</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

