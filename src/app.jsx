import React, { useState, useEffect } from "react";
import Home from "./pages/home.jsx";
import Arena from "./pages/Arena.jsx";
import Quiz from "./pages/Quiz.jsx";
import FlagChallenge from "./pages/FlagChallenge.jsx";
import GuessPlayer from "./pages/GuessPlayer.jsx";
import StatsChallenge from "./pages/StatsChallenge.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
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

