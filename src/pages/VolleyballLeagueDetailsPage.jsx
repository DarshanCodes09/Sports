import React, { useEffect, useState } from "react";
import { getVolleyballLeagues } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballLeagueDetailsPage() {
  const leagueId = window.location.pathname.split("/")[3];

  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError("");
      setLeague(null);

      try {
        const data = await getVolleyballLeagues({ id: leagueId });
        const selectedLeague = Array.isArray(data) ? data[0] : null;

        if (selectedLeague) {
          setLeague(selectedLeague);
        } else {
          setError("League not found.");
        }
      } catch (err) {
        setError(err.message || "Unable to load league details.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [leagueId]);

  return (
    <main className="volleyball-library-page">
      <div className="volleyball-page-container">
        <div className="volleyball-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/volleyball/countries">Volleyball</a>
          <span>/</span>
          <a href="/volleyball/leagues">Leagues</a>
          <span>/</span>
          <strong>Competition Details</strong>
        </div>

        {loading ? (
          <div className="volleyball-state">
            <div className="volleyball-loader" />
            <h3>Loading competition</h3>
            <p>Gathering league information and available seasons...</p>
          </div>
        ) : error ? (
          <div className="volleyball-state volleyball-error-state">
            <h3>Unable to load competition</h3>
            <p>{error}</p>

            <button
              className="volleyball-back-button"
              onClick={() => {
                window.location.href = "/volleyball/leagues";
              }}
            >
              ← Back to Leagues
            </button>
          </div>
        ) : league ? (
          <>
            <button
              type="button"
              className="volleyball-back-button"
              onClick={() => {
                window.location.href = "/volleyball/leagues";
              }}
            >
              ← Back to Leagues
            </button>

            <section className="volleyball-league-profile">
              <div className="volleyball-league-profile-logo">
                {league.logo ? (
                  <img src={league.logo} alt={`${league.name} logo`} />
                ) : (
                  <span>🏆</span>
                )}
              </div>

              <div className="volleyball-league-profile-info">
                <span className="volleyball-eyebrow">
                  VOLLEYBALL COMPETITION
                </span>

                <h1>{league.name}</h1>

                <div className="volleyball-league-profile-meta">
                  <span>
                    {league.country?.flag && (
                      <img
                        src={league.country.flag}
                        alt=""
                        className="volleyball-league-country-flag"
                      />
                    )}
                    {league.country?.name || "International"}
                  </span>

                  <span>{league.type || "Competition"}</span>
                </div>
              </div>
            </section>

            <section className="volleyball-directory-section volleyball-seasons-section">
              <div className="volleyball-section-heading">
                <div>
                  <span className="volleyball-eyebrow">
                    SEASON ARCHIVE
                  </span>

                  <h2>Available Seasons</h2>

                  <p>
                    Explore competition seasons and view their standings.
                  </p>
                </div>

                <span className="volleyball-count">
                  {league.seasons?.length || 0} seasons
                </span>
              </div>

              {league.seasons?.length > 0 ? (
                <div className="volleyball-seasons-grid">
                  {[...league.seasons]
                    .sort((a, b) => Number(b.season) - Number(a.season))
                    .map((item) => (
                      <div
                        className="volleyball-season-card"
                        key={item.season}
                      >
                        <div className="volleyball-season-card-header">
                          <span className="volleyball-season-label">
                            SEASON
                          </span>

                          {item.current && (
                            <span className="volleyball-current-season">
                              Current
                            </span>
                          )}
                        </div>

                        <h3>{item.season}</h3>

                        <div className="volleyball-season-dates">
                          <div>
                            <span>START DATE</span>
                            <p>{item.start || "Not available"}</p>
                          </div>

                          <div>
                            <span>END DATE</span>
                            <p>{item.end || "Not available"}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="volleyball-standings-button"
                          onClick={() => {
                            window.location.href = `/volleyball/standings/${leagueId}/${item.season}`;
                          }}
                        >
                          View Standings
                          <span>→</span>
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="volleyball-state">
                  <h3>No seasons available</h3>
                  <p>
                    No season information is currently available for this
                    competition.
                  </p>
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default VolleyballLeagueDetailsPage;