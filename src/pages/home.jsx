import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import ExploreSportsSection from "../components/ExploreSportsSection.jsx";
import FindYourGameSection from "../components/FindYourGameSection.jsx";

// SPORTSVERSE Homepage component
// 01 — HERO ("Every Sport Has a Story.")
// 02 — EXPLORE OUR SPORTS (Cricket, Football, Basketball, Volleyball - 4 Photographic Cards)
// 03 — THE GAMES WE LOVE / FIND YOUR GAME (Arena Gaming Hub & Sports Explorer)
function Home() {
  return (
    <div className="sportsverse-home-page">
      {/* SECTION 01 — HERO */}
      <HeroSection />

      {/* SECTION 02 — EXPLORE OUR SPORTS */}
      <ExploreSportsSection />

      {/* SECTION 03 — FIND YOUR GAME */}
      <FindYourGameSection />
    </div>
  );
}

export default Home;
