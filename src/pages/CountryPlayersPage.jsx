import React, { useEffect, useState } from "react";
import { getPlayersByTeam } from "../services/cricketService";
import "../styles/CricketLists.css";

export default function CountryPlayersPage() {
  const countryId = decodeURIComponent(
    window.location.pathname.split("/")[2] || ""
  );

  const countryName = countryId.replaceAll("-", " ");

  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPlayers(pageNumber) {
    try {
      setLoading(true);
      setError("");

      const result = await getPlayersByTeam(countryId, pageNumber);

      setPlayers(result.players || []);
      setMeta(result.meta || {});
      setPage(pageNumber);
    } catch (err) {
      setError(err.message || "Unable to load players.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlayers(1);
  }, [countryId]);

  return (
    <main className="cricket-library-page">
      <div className="cricket-page-container">
        <div className="cricket-breadcrumb">
          <button onClick={() => (window.location.href = "/countries")}>
            Cricket Countries
          </button>
          <span>/</span>
          <span>{countryName}</span>
        </div>

        <section className="cricket-page-hero">
          <div className="cricket-page-hero-content">
            <span className="cricket-eyebrow">CRICKET DIRECTORY</span>

            <h1>
              {countryName}
              <span> Players</span>
            </h1>

            <p>
              Explore the players representing {countryName}, discover their
              records and dive into their cricketing journeys.
            </p>
          </div>

          <div className="cricket-hero-decoration">
            <span>CRICKET</span>
          </div>
        </section>

        <section className="cricket-content-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">THE PLAYER DIRECTORY</span>
              <h2>Meet the players</h2>
            </div>

            {!loading && !error && (
              <span className="cricket-result-count">
                {players.length} players shown
              </span>
            )}
          </div>

          {loading ? (
            <div className="cricket-state-card">
              <div className="cricket-loader" />
              <h3>Loading players</h3>
              <p>Gathering the player information for {countryName}.</p>
            </div>
          ) : error ? (
            <div className="cricket-state-card cricket-error-state">
              <span className="cricket-state-icon">!</span>
              <h3>Players unavailable</h3>
              <p>{error}</p>
              <button
                className="cricket-primary-button"
                onClick={() => loadPlayers(page)}
              >
                Try again
              </button>
            </div>
          ) : players.length === 0 ? (
            <div className="cricket-state-card">
              <span className="cricket-state-icon">🏏</span>
              <h3>No players found</h3>
              <p>There are currently no player records available for this country.</p>
            </div>
          ) : (
            <>
              <div className="cricket-player-grid">
                {players.map((player) => (
                  <button
                    className="cricket-player-card"
                    key={player.player}
                    onClick={() =>
                      (window.location.href = `/players/${player.player}`)
                    }
                  >
                    <div className="cricket-player-card-top">
                      <span className="cricket-player-avatar">
                        {player.name?.charAt(0)?.toUpperCase() || "P"}
                      </span>
                      <span className="cricket-card-arrow">↗</span>
                    </div>

                    <div className="cricket-player-card-info">
                      <span className="cricket-player-label">PLAYER</span>
                      <h3>{player.name}</h3>
                      <p>
                        {player.matches ?? "—"} matches played
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="cricket-pagination">
                <button
                  className="cricket-pagination-button"
                  disabled={!meta.prev_page || loading}
                  onClick={() => loadPlayers(meta.prev_page)}
                >
                  <span>←</span> Previous
                </button>

                <span className="cricket-page-number">
                  Page <strong>{meta.page || page}</strong> of{" "}
                  <strong>{meta.total_pages || 1}</strong>
                </span>

                <button
                  className="cricket-pagination-button"
                  disabled={!meta.next_page || loading}
                  onClick={() => loadPlayers(meta.next_page)}
                >
                  Next <span>→</span>
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}