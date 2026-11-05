import React, { useEffect, useState } from "react";
import { getCompetitions } from "../services/cricketService";
import "../styles/CricketLists.css";

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLeagues() {
      try {
        const data = await getCompetitions();

        if (active) {
          setLeagues(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load cricket leagues.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadLeagues();

    return () => {
      active = false;
    };
  }, []);

  const filteredLeagues = leagues.filter((league) =>
    `${league.name || ""} ${league.type || ""}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <main className="cricket-library-page">
      <div className="cricket-page-container">

        {/* PAGE HERO */}

        <section className="cricket-page-hero">
          <div className="cricket-page-hero-content">
            <span className="cricket-eyebrow">
              CRICKET / COMPETITIONS
            </span>

            <h1>
              The League
              <span> Collection.</span>
            </h1>

            <p>
              Explore cricket competitions from around the world.
              Discover participating teams and follow every tournament.
            </p>
          </div>

          <div className="cricket-hero-decoration">
            LEAGUES
          </div>
        </section>

        {/* LEAGUE DIRECTORY */}

        <section className="cricket-content-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">
                THE COMPETITION DIRECTORY
              </span>
              <h2>Explore leagues</h2>
            </div>

            {!loading && !error && (
              <span className="cricket-result-count">
                {filteredLeagues.length} competitions
              </span>
            )}
          </div>

          {/* SEARCH */}

          <div className="cricket-directory-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search leagues or competition types..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search cricket leagues"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* LOADING */}

          {loading && (
            <div className="cricket-state-card">
              <div className="cricket-loader" />
              <h3>Loading competitions</h3>
              <p>Gathering cricket leagues and tournaments.</p>
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="cricket-state-card cricket-error-state">
              <span className="cricket-state-icon">!</span>
              <h3>Competitions unavailable</h3>
              <p>{error}</p>

              <button
                className="cricket-primary-button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {/* EMPTY */}

          {!loading && !error && filteredLeagues.length === 0 && (
            <div className="cricket-state-card">
              <span className="cricket-state-icon">🏆</span>
              <h3>
                {leagues.length === 0
                  ? "No competitions available"
                  : "No matching leagues"}
              </h3>
              <p>
                {leagues.length === 0
                  ? "There are currently no competition records available."
                  : "Try another league name or competition type."}
              </p>
            </div>
          )}

          {/* LEAGUE CARDS */}

          {!loading && !error && filteredLeagues.length > 0 && (
            <div className="cricket-league-grid">
              {filteredLeagues.map((league) => (
                <button
                  className="cricket-league-card"
                  key={league.competition}
                  onClick={() =>
                    (window.location.href = `/leagues/${league.competition}`)
                  }
                >
                  <div className="cricket-league-card-top">
                    <span className="cricket-league-icon">
                      🏆
                    </span>

                    <span className="cricket-league-arrow">
                      ↗
                    </span>
                  </div>

                  <span className="cricket-player-label">
                    CRICKET COMPETITION
                  </span>

                  <h3>{league.name}</h3>

                  <div className="cricket-league-card-bottom">
                    <span>{league.type || "Competition"}</span>
                    <span className="cricket-league-explore">
                      Explore →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}