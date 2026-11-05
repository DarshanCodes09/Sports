import React, { useState, useEffect } from "react";
import Home from "./pages/home.jsx";
import Arena from "./pages/Arena.jsx";
import Profile from "./pages/Profile.jsx";
import Quiz from "./pages/Quiz.jsx";
import FlagChallenge from "./pages/FlagChallenge.jsx";
import GuessPlayer from "./pages/GuessPlayer.jsx";
import StatsChallenge from "./pages/StatsChallenge.jsx";
import Navbar from "./components/Navbar.jsx";
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
import BasketballCountriesPage from "./pages/BasketballCountriesPage.jsx";
import BasketballTeamsPage from "./pages/BasketballTeamsPage.jsx";
import BasketballLeaguesPage from "./pages/BasketballLeaguesPage.jsx";
import BasketballLeagueDetailsPage from "./pages/BasketballLeagueDetailsPage.jsx";
import BasketballStandingsPage from "./pages/BasketballStandingsPage.jsx";
import BasketballPlayersPage from "./pages/BasketballPlayersPage.jsx";
import BasketballPlayerDetailsPage from "./pages/BasketballPlayerDetailsPage.jsx";
import BasketballTeamDetailsPage from "./pages/BasketballTeamDetailsPage.jsx";
import VolleyballCountriesPage from "./pages/VolleyballCountriesPage.jsx";
import VolleyballTeamsPage from "./pages/VolleyballTeamsPage.jsx";
import VolleyballTeamDetailsPage from "./pages/VolleyballTeamDetailsPage.jsx";
import VolleyballLeaguesPage from "./pages/VolleyballLeaguesPage.jsx";
import VolleyballLeagueDetailsPage from "./pages/VolleyballLeagueDetailsPage.jsx";
import VolleyballStandingsPage from "./pages/VolleyballStandingsPage.jsx";
import VolleyballGamesPage from "./pages/VolleyballGamesPage.jsx";
import "./App.css";

// Helper to normalize trailing slashes (e.g. "/arena/" -> "/arena")
function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

// Main SPORTSVERSE App component with client-side SPA routing
function App() {
  const [locationState, setLocationState] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }));

  const currentPath = normalizePath(locationState.pathname);

  useEffect(() => {
    // Handle browser back and forward buttons
    const handleLocationChange = () => {
      setLocationState({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      });
    };

    // Intercept normal left-clicks on internal links for smooth SPA navigation
    const handleLinkClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest("a[href]");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
        return;
      }

      let url;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      // Only handle internal same-origin page routes (never /api/* or static .html files)
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith("/api/")) return;
      if (url.pathname.endsWith(".html")) return;

      event.preventDefault();

      const nextUrl = `${url.pathname}${url.search}${url.hash}`;
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (nextUrl !== currentUrl) {
        window.history.pushState({}, "", nextUrl);
      }

      setLocationState({
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      });

      if (url.hash) {
        const targetId = url.hash.slice(1);
        requestAnimationFrame(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        });
      } else if (normalizePath(url.pathname) !== normalizePath(window.location.pathname) || !url.hash) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  // Scroll to hash section when loading a URL like /#find-game directly
  useEffect(() => {
    if (!locationState.hash) return;
    const targetId = locationState.hash.slice(1);
    const timer = setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [currentPath, locationState.hash]);

  // Renders the appropriate page based on current URL path
  const renderCurrentPage = () => {
    // Volleyball routes
    if (currentPath === "/volleyball/countries") {
      return <VolleyballCountriesPage />;
    }
    if (/^\/volleyball\/teams\/.+/.test(currentPath)) {
      return <VolleyballTeamsPage />;
    }
    if (currentPath.startsWith("/volleyball/team/")) {
      return <VolleyballTeamDetailsPage />;
    }
    if (currentPath === "/volleyball/leagues") {
      return <VolleyballLeaguesPage />;
    }
    if (
      currentPath.startsWith("/volleyball/league/") ||
      currentPath.startsWith("/volleyball/leagues/")
    ) {
      return <VolleyballLeagueDetailsPage />;
    }
    if (
      currentPath === "/volleyball/standings" ||
      currentPath.startsWith("/volleyball/standings/")
    ) {
      return <VolleyballStandingsPage />;
    }
    if (currentPath === "/volleyball/games") {
      return <VolleyballGamesPage />;
    }

    // Basketball routes
    if (currentPath === "/basketball/countries") {
      return <BasketballCountriesPage />;
    }
    if (/^\/basketball\/teams\/.+/.test(currentPath)) {
      return <BasketballTeamsPage />;
    }
    if (currentPath === "/basketball/leagues") {
      return <BasketballLeaguesPage />;
    }
    if (
      currentPath.startsWith("/basketball/leagues/") ||
      currentPath.startsWith("/basketball/league/")
    ) {
      return <BasketballLeagueDetailsPage />;
    }
    if (
      currentPath === "/basketball/standings" ||
      currentPath.startsWith("/basketball/standings/")
    ) {
      return <BasketballStandingsPage />;
    }
    if (currentPath === "/basketball/players") {
      return <BasketballPlayersPage />;
    }
    if (
      currentPath.startsWith("/basketball/player/") ||
      currentPath.startsWith("/basketball/players/")
    ) {
      return <BasketballPlayerDetailsPage />;
    }
    if (currentPath.startsWith("/basketball/team/")) {
      return <BasketballTeamDetailsPage />;
    }

    // Football routes
    if (currentPath === "/football/countries") {
      return <FootballCountriesPage />;
    }
    if (currentPath === "/football/leagues") {
      return <FootballLeaguesPage />;
    }
    if (currentPath === "/football/players") {
      return <FootballPlayersPage />;
    }
    if (currentPath === "/football/standings") {
      return <FootballStandingsPage />;
    }
    if (/^\/football\/players\/[^/]+$/.test(currentPath)) {
      return <FootballPlayerDetailsPage />;
    }
    if (/^\/football\/team\/[^/]+$/.test(currentPath)) {
      return <FootballTeamDetailsPage />;
    }
    if (/^\/football\/teams\/[^/]+$/.test(currentPath)) {
      return <FootballTeamsPage />;
    }

    // Cricket routes
    if (currentPath === "/countries") {
      return <CountriesPage />;
    }
    if (/^\/countries\/[^/]+\/players$/.test(currentPath)) {
      return <CountryPlayersPage />;
    }
    if (currentPath === "/leagues") {
      return <LeaguesPage />;
    }
    if (/^\/leagues\/[^/]+$/.test(currentPath)) {
      return <LeagueTeamsPage />;
    }
    if (currentPath === "/players") {
      return <PlayerUniverse />;
    }
    if (/^\/players\/[^/]+$/.test(currentPath)) {
      return <PlayerDetailsPage />;
    }

    // Sports Arena & Games routes
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
    if (currentPath === "/arena" || currentPath.startsWith("/arena/")) {
      return <Arena />;
    }

    // Profile route
    if (currentPath === "/profile") {
      return <Profile />;
    }

    // Default Homepage (also handles /#hero, /#explore-sports, /#find-game)
    return <Home />;
  };

  return (
    <div className="strivora-app">
      <Navbar currentPath={currentPath} currentHash={locationState.hash} />
      <main
        className="strivora-main"
        key={`${currentPath}${locationState.search}`}
      >
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
