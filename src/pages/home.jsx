import React from "react";
import ArenaSection from "../components/ArenaSection.jsx";

// STRIVORA Homepage component
function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="home-hero">
        <p className="home-hero-tag">Welcome to STRIVORA</p>
        <h1 className="home-hero-title">The Ultimate Sports & Gaming Destination</h1>
        <p className="home-hero-desc">
          Explore comprehensive sports coverage, live trivia, player challenges, and interactive competitions all in one place.
        </p>
        <div className="home-hero-actions">
          <a href="/arena" className="home-btn-primary">
            Enter Sports Arena &rarr;
          </a>
          <a href="/arena/quiz" className="home-btn-secondary">
            Play Sports Quiz
          </a>
        </div>
      </section>

      {/* STRIVORA Sports Arena Promotional Banner in the middle of Homepage */}
      <ArenaSection />
    </div>
  );
}

export default Home;

