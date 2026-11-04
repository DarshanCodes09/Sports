import React, { useState, useEffect } from "react";
import Home from "./pages/home.jsx";
import Arena from "./pages/Arena.jsx";
import Profile from "./pages/Profile.jsx";
import Quiz from "./pages/Quiz.jsx";
import FlagChallenge from "./pages/FlagChallenge.jsx";
import GuessPlayer from "./pages/GuessPlayer.jsx";
import StatsChallenge from "./pages/StatsChallenge.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PlayerUniverse from "./pages/PlayerUniverse.jsx";
import CountriesPage from "./pages/CountriesPage.jsx";
import CountryPlayersPage from "./pages/CountryPlayersPage.jsx";
import PlayerDetailsPage from "./pages/PlayerDetailsPage.jsx";
import LeaguesPage from "./pages/LeaguesPage.jsx";
import LeagueTeamsPage from "./pages/LeagueTeamsPage.jsx";
import FootballCountriesPage from "./pages/FootballCountriesPage.jsx";
import FootballTeamsPage from "./pages/FootballTeamsPage.jsx";
import FootballLeaguesPage from "./pages/FootballLeaguesPage.jsx";
import FootballPlayersPage from "./pages/FootballPlayersPage.jsx";
import FootballPlayerDetailsPage from "./pages/FootballPlayerDetailsPage.jsx";
import FootballStandingsPage from "./pages/FootballStandingsPage.jsx";
import FootballTeamDetailsPage from "./pages/FootballTeamDetailsPage.jsx";
import "./App.css";

// Main STRIVORA App component with lightweight path routing
function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for browser forward/back buttons
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Renders the appropriate page based on current URL path
  const renderCurrentPage = () => {
    
    if (currentPath === "/countries") return <CountriesPage />;
    if (currentPath === "/football/countries") return <FootballCountriesPage />;
    if (currentPath === "/football/leagues") return <FootballLeaguesPage />;
    if (currentPath === "/football/players") return <FootballPlayersPage />;
    if (currentPath === "/football/standings") {
      return <FootballStandingsPage />;
    }
    if (/^\/football\/players\/[^/]+$/.test(currentPath)) {
      return <FootballPlayerDetailsPage />;
    }
    if (/^\/football\/team\/\d+$/.test(currentPath)) {
      return <FootballTeamDetailsPage />;
    }
    if (/^\/football\/teams\/[^/]+$/.test(currentPath)) {
      return <FootballTeamsPage />;
    }
    if (currentPath === "/leagues") return <LeaguesPage />;
    if (/^\/leagues\/[^/]+$/.test(currentPath)) return <LeagueTeamsPage />;

    if (/^\/countries\/[^/]+\/players$/.test(currentPath)) {
      return <CountryPlayersPage />;
    }

    if (currentPath === "/players") return <PlayerUniverse />;

    if (/^\/players\/[^/]+$/.test(currentPath)) {
      return <PlayerDetailsPage />;
    }
    if (currentPath === "/arena/quiz") {
      return <Quiz />;
    }
    if (currentPath === "/arena/flag-challenge") {
      return <FlagChallenge />;
    }
    if (currentPath === "/arena/guess-player") {
      return <GuessPlayer />;
    }
    if (currentPath === "/arena/stats-challenge") {
      return <StatsChallenge />;
    }
    if (currentPath.startsWith("/arena")) {
      return <Arena />;
    }
    if (currentPath === "/profile") {
      return <Profile />;
    }
    return <Home />;
  };

  return (
    <div className="strivora-app">
      <Navbar currentPath={currentPath} />
      <main className="strivora-main">{renderCurrentPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
