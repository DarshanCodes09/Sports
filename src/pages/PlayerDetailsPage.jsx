
import React, { useEffect, useState } from "react";
import {
  getPlayerProfile,
  getPlayerStats,
} from "../services/cricketService";
import "../styles/CricketLists.css";

export default function PlayerDetailsPage() {
  const playerId = window.location.pathname.split("/")[2];

  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPlayer() {
      try {
        setLoading(true);
        setError("");

        const [profile, playerStats] = await Promise.all([
          getPlayerProfile(playerId),
          getPlayerStats(playerId),
        ]);

        if (active) {
          setPlayer(profile);
          setStats(playerStats);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load player profile.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPlayer();

    return () => {
      active = false;
    };
  }, [playerId]);

  function formatNumber(value) {
    if (value === null || value === undefined || value === "") {
      return "—";
    }

    return typeof value === "number"
      ? value.toLocaleString("en-IN")
      : value;
  }

  function formatLabel(value) {
    return value.replaceAll("_", " ");
  }

  function getHighestScore() {
    const batting = stats?.batting;

    if (!batting) return "—";

    const scores = Object.values(batting)
      .map((format) => {
        const data = format || {};
        return (
          data.highest_score ??
          data.high_score ??
          data.hs ??
          null
        );
      })
      .filter((score) => score !== null && score !== "");

    if (!scores.length) return "—";

    return scores.reduce((highest, current) => {
      const currentNumber = Number.parseInt(current, 10);
      const highestNumber = Number.parseInt(highest, 10);

      return currentNumber > highestNumber ? current : highest;
    });
  }

  function goBack() {
    window.history.back();
  }

  if (loading) {
    return (
      <main className="cricket-library-page">
        <div className="cricket-page-container">
          <div className="cricket-state-card">
            <div className="cricket-loader" />
            <h3>Loading player profile</h3>
            <p>Gathering career information and statistics.</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="cricket-library-page">
        <div className="cricket-page-container">
          <div className="cricket-state-card cricket-error-state">
            <span className="cricket-state-icon">!</span>
            <h3>Profile unavailable</h3>
            <p>{error}</p>

            <button
              className="cricket-primary-button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!player) {
    return (
      <main className="cricket-library-page">
        <div className="cricket-page-container">
          <div className="cricket-state-card">
            <span className="cricket-state-icon">🏏</span>
            <h3>Player not found</h3>
            <p>We couldn't find the requested player profile.</p>

            <button
              className="cricket-primary-button"
              onClick={goBack}
            >
              Go back
            </button>
          </div>
        </div>
      </main>
    );
  }

  const statGroups = [
    { key: "batting", label: "Batting statistics" },
    { key: "bowling", label: "Bowling statistics" },
  ];

  return (
    <main className="cricket-library-page">
      <div className="cricket-page-container">
        <div className="cricket-breadcrumb">
          <button onClick={() => (window.location.href = "/players")}>
            Player Universe
          </button>
          <span>/</span>
          <span>{player.name}</span>
        </div>

        <section className="cricket-detail-hero">
          <div className="cricket-detail-avatar">🏏</div>

          <div className="cricket-detail-heading">
            <span className="cricket-eyebrow">
              CRICKET PLAYER PROFILE
            </span>

            <h1>{player.name}</h1>

            <p>
              {player.country ||
                player.nationality ||
                "Country information unavailable"}
            </p>
          </div>

          <div className="cricket-detail-watermark">
            CRICKET
          </div>
        </section>

        <section className="cricket-detail-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">PLAYER OVERVIEW</span>
              <h2>At a glance</h2>
            </div>
          </div>

          <div className="cricket-details-grid">
            <div>
              <span>Total matches</span>
              <strong>{formatNumber(player.matches)}</strong>
            </div>

            <div>
              <span>Highest score</span>
              <strong>{getHighestScore()}</strong>
            </div>

            <div>
              <span>Date of birth</span>
              <strong>{player.born || "Not available"}</strong>
            </div>

            <div>
              <span>Birthplace</span>
              <strong>{player.birthplace || "Not available"}</strong>
            </div>

            <div>
              <span>Batting style</span>
              <strong>{player.batting_style || "Not available"}</strong>
            </div>

            <div>
              <span>Bowling style</span>
              <strong>{player.bowling_style || "Not available"}</strong>
            </div>

            <div>
              <span>First match</span>
              <strong>{player.first_match || "Not available"}</strong>
            </div>
          </div>
        </section>

        <section className="cricket-detail-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">CAREER JOURNEY</span>
              <h2>Teams represented</h2>
            </div>

            <span className="cricket-result-count">
              {player.teams?.length || 0} teams
            </span>
          </div>

          {player.teams?.length ? (
            <div className="cricket-team-grid">
              {player.teams.map((team) => (
                <div className="cricket-team-card" key={team.team}>
                  <span className="cricket-team-icon">🏏</span>

                  <div>
                    <h3>{team.name}</h3>
                    <p>{formatNumber(team.matches)} matches</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cricket-state-card">
              <p>Team information is not available.</p>
            </div>
          )}
        </section>

        <section className="cricket-detail-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">CAREER BREAKDOWN</span>
              <h2>Career statistics</h2>
            </div>
          </div>

          {!stats ? (
            <div className="cricket-state-card">
              <p>Career statistics are not available.</p>
            </div>
          ) : (
            <div className="cricket-stats-list">
              {statGroups.map(({ key, label }) => {
                const formats = stats[key] || {};

                return (
                  <section
                    className="cricket-stat-category"
                    key={key}
                  >
                    <h3>{label}</h3>

                    {Object.entries(formats).length === 0 ? (
                      <p className="cricket-muted-message">
                        No {label.toLowerCase()} available.
                      </p>
                    ) : (
                      <div className="cricket-format-grid">
                        {Object.entries(formats).map(
                          ([format, data]) => (
                            <article
                              className="cricket-format-card"
                              key={format}
                            >
                              <h4>{formatLabel(format)}</h4>

                              <div className="cricket-format-stats">
                                {Object.entries(data || {}).map(
                                  ([statName, value]) => (
                                    <div key={statName}>
                                      <span>
                                        {formatLabel(statName)}
                                      </span>
                                      <strong>
                                        {formatNumber(value)}
                                      </strong>
                                    </div>
                                  )
                                )}
                              </div>
                            </article>
                          )
                        )}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </section>

        <div className="cricket-detail-footer">
          <button
            className="cricket-pagination-button"
            onClick={goBack}
          >
            ← Back
          </button>
        </div>
      </div>
    </main>
  );
}
