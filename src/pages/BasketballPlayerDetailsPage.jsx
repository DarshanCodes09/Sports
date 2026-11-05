
import React, { useEffect, useState } from "react";
import { getBasketballPlayerStatistics } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballPlayerDetailsPage() {
  const params = new URLSearchParams(window.location.search);

  const playerId = window.location.pathname.split("/").pop();
  const name = params.get("name") || "Basketball Player";
  const number = params.get("number") || "N/A";
  const position = params.get("position") || "N/A";
  const country = params.get("country") || "N/A";
  const age = params.get("age") || "N/A";
  const team = params.get("team") || "N/A";
  const season = params.get("season") || "2023";

  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBasketballPlayerStatistics({
          player: playerId,
          season,
        });

        setStatistics(data);
      } catch (err) {
        setError(err.message || "Unable to load player statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, [playerId, season]);

  const formatLabel = (value) => {
    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const showValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return "N/A";

      return (
        <div className="basketball-nested-stat">
          {value.map((item, index) => (
            <div key={index}>
              {showValue(item)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="basketball-nested-stat">
          {Object.entries(value).map(([key, item]) => (
            <div className="basketball-nested-stat-row" key={key}>
              <span>{formatLabel(key)}</span>
              <strong>{showValue(item)}</strong>
            </div>
          ))}
        </div>
      );
    }

    return String(value);
  };

  const goBack = () => window.history.back();

  return (
    <main className="basketball-library-page">
      <div className="basketball-page-container">
        <div className="basketball-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Basketball</span>
          <span>/</span>
          <span>Players</span>
          <span>/</span>
          <strong>{name}</strong>
        </div>

        <button className="basketball-back-button" onClick={goBack}>
          ← Back to Players
        </button>

        <section className="basketball-player-profile-hero">
          <div className="basketball-player-profile-number">
            {number !== "N/A" ? `#${number}` : "🏀"}
          </div>

          <div className="basketball-player-profile-info">
            <span className="basketball-eyebrow">
              ATHLETE PROFILE
            </span>

            <h1>{name}</h1>

            <p>{team}</p>

            <div className="basketball-player-profile-tags">
              <span>{position}</span>
              <span>{country}</span>
              <span>Season {season}</span>
            </div>
          </div>

          <div className="basketball-player-profile-decoration">
            🏀
          </div>
        </section>

        <section className="basketball-directory-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">
                PLAYER OVERVIEW
              </span>
              <h2>Player Information</h2>
              <p>Personal and team information for this athlete.</p>
            </div>
          </div>

          <div className="basketball-player-information-grid">
            <div className="basketball-player-information-card">
              <span>TEAM</span>
              <strong>{team}</strong>
            </div>

            <div className="basketball-player-information-card">
              <span>JERSEY NUMBER</span>
              <strong>{number}</strong>
            </div>

            <div className="basketball-player-information-card">
              <span>POSITION</span>
              <strong>{position}</strong>
            </div>

            <div className="basketball-player-information-card">
              <span>COUNTRY</span>
              <strong>{country}</strong>
            </div>

            <div className="basketball-player-information-card">
              <span>AGE</span>
              <strong>{age}</strong>
            </div>

            <div className="basketball-player-information-card">
              <span>SEASON</span>
              <strong>{season}</strong>
            </div>
          </div>
        </section>

        <section className="basketball-directory-section basketball-player-statistics-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">
                ON-COURT PERFORMANCE
              </span>
              <h2>Player Statistics</h2>
              <p>Explore the available performance data for this season.</p>
            </div>
          </div>

          {loading ? (
            <div className="basketball-state">
              <div className="basketball-loader"></div>
              <h3>Loading statistics</h3>
              <p>Getting player performance information...</p>
            </div>
          ) : error ? (
            <div className="basketball-state basketball-error">
              <span>!</span>
              <h3>Unable to load statistics</h3>
              <p>{error}</p>
            </div>
          ) : statistics.length === 0 ? (
            <div className="basketball-state">
              <span>📊</span>
              <h3>No statistics available</h3>
              <p>
                No performance statistics are currently available
                for this player and season.
              </p>
            </div>
          ) : (
            <div className="basketball-player-statistics-grid">
              {statistics.map((item, index) => (
                <article
                  className="basketball-player-statistics-card"
                  key={index}
                >
                  {Object.entries(item).map(([key, value]) => (
                    <div
                      className="basketball-player-stat-block"
                      key={key}
                    >
                      <h3>{formatLabel(key)}</h3>
                      <div className="basketball-player-stat-value">
                        {showValue(value)}
                      </div>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default BasketballPlayerDetailsPage;
