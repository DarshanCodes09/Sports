
import React, { useEffect, useState } from "react";
import { getBasketballLeagues } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballLeagueDetailsPage() {
  const leagueId = window.location.pathname.split("/")[3];

  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBasketballLeagues({ id: leagueId });

        if (data.length > 0) {
          setLeague(data[0]);
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

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <main className="basketball-library-page">
        <div className="basketball-page-container">
          <div className="basketball-state">
            <div className="basketball-loader"></div>
            <h3>Loading league details</h3>
            <p>Preparing competition information...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !league) {
    return (
      <main className="basketball-library-page">
        <div className="basketball-page-container">
          <div className="basketball-state basketball-error">
            <span>!</span>
            <h3>League unavailable</h3>
            <p>{error || "League not found."}</p>
            <button className="basketball-back-button" onClick={goBack}>
              ← Back to Leagues
            </button>
          </div>
        </div>
      </main>
    );
  }

  const seasons = [...(league.seasons || [])].sort(
    (a, b) => Number(b.season) - Number(a.season)
  );

  const coverageItems = [
    {
      label: "Standings",
      available: (item) => item.coverage?.standings,
    },
    {
      label: "Player statistics",
      available: (item) => item.coverage?.players,
    },
    {
      label: "Team statistics",
      available: (item) => item.coverage?.games?.statistics?.teams,
    },
  ];

  return (
    <main className="basketball-library-page">
      <div className="basketball-page-container">
        <div className="basketball-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Basketball</span>
          <span>/</span>
          <span>Leagues</span>
          <span>/</span>
          <strong>{league.name}</strong>
        </div>

        <button className="basketball-back-button" onClick={goBack}>
          ← Back to Leagues
        </button>

        <section className="basketball-league-profile">
          <div className="basketball-league-profile-logo">
            <img src={league.logo} alt={`${league.name} logo`} />
          </div>

          <div className="basketball-league-profile-info">
            <span className="basketball-eyebrow">
              COMPETITION PROFILE
            </span>

            <h1>{league.name}</h1>

            <div className="basketball-league-profile-meta">
              <span>
                {league.country?.name || "International"}
              </span>
              <span>{league.type || "Competition"}</span>
            </div>
          </div>

          <div className="basketball-league-profile-icon">
            🏆
          </div>
        </section>

        <section className="basketball-directory-section basketball-seasons-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">
                COMPETITION HISTORY
              </span>
              <h2>Available Seasons</h2>
              <p>
                Explore season details and available competition coverage.
              </p>
            </div>

            <span className="basketball-result-count">
              {seasons.length} seasons
            </span>
          </div>

          {seasons.length === 0 ? (
            <div className="basketball-state">
              <span>◷</span>
              <h3>No seasons available</h3>
              <p>
                There are currently no season records for this competition.
              </p>
            </div>
          ) : (
            <div className="basketball-season-grid">
              {seasons.map((item) => {
                const canViewStandings =
                  item.coverage?.standings &&
                  [2022, 2023, 2024].includes(Number(item.season));

                return (
                  <article
                    className="basketball-season-card"
                    key={item.season}
                  >
                    <div className="basketball-season-card-header">
                      <div>
                        <span className="basketball-eyebrow">
                          SEASON
                        </span>

                        <h3>{item.season}</h3>
                      </div>

                      <span className="basketball-season-icon">
                        🏀
                      </span>
                    </div>

                    <div className="basketball-season-dates">
                      <div>
                        <span>START DATE</span>
                        <strong>{item.start || "Not available"}</strong>
                      </div>

                      <div>
                        <span>END DATE</span>
                        <strong>{item.end || "Not available"}</strong>
                      </div>
                    </div>

                    <div className="basketball-coverage-section">
                      <h4>Available Coverage</h4>

                      <div className="basketball-coverage-list">
                        {coverageItems.map((coverage) => {
                          const available = Boolean(coverage.available(item));

                          return (
                            <div
                              className="basketball-coverage-item"
                              key={coverage.label}
                            >
                              <span>{coverage.label}</span>

                              <span
                                className={
                                  available
                                    ? "basketball-coverage-status available"
                                    : "basketball-coverage-status unavailable"
                                }
                              >
                                <span className="basketball-coverage-dot"></span>
                                {available ? "Available" : "Unavailable"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {canViewStandings ? (
                      <button
                        className="basketball-season-action"
                        onClick={() => {
                          window.location.href =
                            `/basketball/standings/${leagueId}/${item.season}`;
                        }}
                      >
                        View Standings <span>↗</span>
                      </button>
                    ) : (
                      <div className="basketball-season-unavailable">
                        Standings not available for this season
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default BasketballLeagueDetailsPage;
