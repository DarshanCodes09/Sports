import React, { useEffect, useState } from "react";
import {
  getVolleyballTeams,
  getVolleyballGames,
} from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballTeamDetailsPage() {
  const teamId = window.location.pathname.split("/")[3];

  const [team, setTeam] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gamesLoading, setGamesLoading] = useState(false);
  const [gamesRequested, setGamesRequested] = useState(false);
  const [error, setError] = useState("");
  const [gamesError, setGamesError] = useState("");

  const season = 2024;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError("");

      try {
        const teamData = await getVolleyballTeams({
          id: teamId,
        });

        if (Array.isArray(teamData) && teamData.length > 0) {
          setTeam(teamData[0]);
        } else {
          setError("Team not found.");
        }
      } catch (err) {
        setError(err.message || "Unable to load team details.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [teamId]);

  const loadGames = async () => {
    try {
      setGamesLoading(true);
      setGamesRequested(true);
      setGamesError("");

      const gameData = await getVolleyballGames({
        team: teamId,
        season,
      });

      setGames(Array.isArray(gameData) ? gameData : []);
    } catch (err) {
      setGamesError(err.message || "Unable to load match history.");
    } finally {
      setGamesLoading(false);
    }
  };

  return (
    <main className="volleyball-library-page">
      <div className="volleyball-page-container">
        <div className="volleyball-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/volleyball/countries">Volleyball</a>
          <span>/</span>
          <strong>Team Profile</strong>
        </div>

        {loading ? (
          <div className="volleyball-state">
            <div className="volleyball-loader" />
            <h3>Loading team profile</h3>
            <p>Gathering team information...</p>
          </div>
        ) : error ? (
          <div className="volleyball-state volleyball-error-state">
            <h3>Unable to load team</h3>
            <p>{error}</p>

            <button
              type="button"
              className="volleyball-back-button"
              onClick={() => window.history.back()}
            >
              ← Back to Teams
            </button>
          </div>
        ) : !team ? (
          <div className="volleyball-state">
            <h3>Team not found</h3>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="volleyball-back-button"
              onClick={() => window.history.back()}
            >
              ← Back to Teams
            </button>

            <section className="volleyball-team-profile-hero">
              <div className="volleyball-team-profile-logo">
                {team.logo ? (
                  <img src={team.logo} alt={`${team.name} logo`} />
                ) : (
                  <span>🏐</span>
                )}
              </div>

              <div className="volleyball-team-profile-info">
                <span className="volleyball-eyebrow">
                  VOLLEYBALL TEAM PROFILE
                </span>

                <h1>{team.name}</h1>

                <div className="volleyball-team-profile-meta">
                  <span>
                    {team.country?.name || "Country unavailable"}
                  </span>

                  <span>
                    {team.national ? "National Team" : "Club Team"}
                  </span>
                </div>

                <p className="volleyball-team-id">
                  Team ID: {team.id}
                </p>
              </div>
            </section>

            <section className="volleyball-directory-section volleyball-match-history-section">
              <div className="volleyball-section-heading">
                <div>
                  <span className="volleyball-eyebrow">
                    TEAM PERFORMANCE
                  </span>

                  <h2>Match History</h2>

                  <p>
                    Explore this team's matches and set-by-set results
                    for the {season} season.
                  </p>
                </div>

                <span className="volleyball-count">
                  Season {season}
                </span>
              </div>

              {!gamesRequested ? (
                <div className="volleyball-match-load-panel">
                  <div className="volleyball-match-load-icon">
                    🏐
                  </div>

                  <h3>Explore Match Results</h3>

                  <p>
                    Load the team's match history to view opponents,
                    scores and individual set results.
                  </p>

                  <button
                    type="button"
                    className="volleyball-load-games-button"
                    onClick={loadGames}
                    disabled={gamesLoading}
                  >
                    Load Match History →
                  </button>
                </div>
              ) : gamesLoading ? (
                <div className="volleyball-state">
                  <div className="volleyball-loader" />
                  <h3>Loading match history</h3>
                  <p>Fetching match results for {season}...</p>
                </div>
              ) : gamesError ? (
                <div className="volleyball-state volleyball-error-state">
                  <h3>Unable to load matches</h3>
                  <p>{gamesError}</p>

                  <button
                    type="button"
                    className="volleyball-load-games-button"
                    onClick={loadGames}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="volleyball-match-results-summary">
                    <span>
                      {games.length} {games.length === 1 ? "match" : "matches"} found
                    </span>

                    <button
                      type="button"
                      onClick={loadGames}
                      disabled={gamesLoading}
                    >
                      Refresh
                    </button>
                  </div>

                  {games.length > 0 ? (
                    <div className="volleyball-games-list">
                      {games.map((game) => (
                        <article
                          className="volleyball-game-card"
                          key={game.id}
                        >
                          <div className="volleyball-game-card-header">
                            <div>
                              <strong>
                                {game.league?.name || "Competition"}
                              </strong>

                              <span>
                                {game.league?.season || season}
                              </span>
                            </div>

                            <span className="volleyball-game-date">
                              {game.date
                                ? new Date(game.date).toLocaleDateString()
                                : "Date unavailable"}
                            </span>
                          </div>

                          <div className="volleyball-game-matchup">
                            <div className="volleyball-game-side">
                              {game.teams?.home?.logo ? (
                                <img
                                  src={game.teams.home.logo}
                                  alt={game.teams.home.name || "Home team"}
                                  loading="lazy"
                                />
                              ) : (
                                <span>🏐</span>
                              )}

                              <strong>
                                {game.teams?.home?.name || "Home Team"}
                              </strong>
                            </div>

                            <div className="volleyball-game-score">
                              <strong>
                                {game.scores?.home ?? "-"}
                                <span>:</span>
                                {game.scores?.away ?? "-"}
                              </strong>

                              <small>FINAL SCORE</small>
                            </div>

                            <div className="volleyball-game-side">
                              {game.teams?.away?.logo ? (
                                <img
                                  src={game.teams.away.logo}
                                  alt={game.teams.away.name || "Away team"}
                                  loading="lazy"
                                />
                              ) : (
                                <span>🏐</span>
                              )}

                              <strong>
                                {game.teams?.away?.name || "Away Team"}
                              </strong>
                            </div>
                          </div>

                          <div className="volleyball-game-card-footer">
                            <span className="volleyball-game-status">
                              {game.status?.long || "Unknown status"}
                            </span>

                            <div className="volleyball-game-periods">
                              {[
                                "first",
                                "second",
                                "third",
                                "fourth",
                                "fifth",
                              ].map((period, index) => {
                                const score = game.periods?.[period];

                                if (
                                  score?.home == null ||
                                  score?.away == null
                                ) {
                                  return null;
                                }

                                return (
                                  <span key={period}>
                                    Set {index + 1}: {score.home} - {score.away}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="volleyball-state">
                      <h3>No matches available</h3>
                      <p>
                        No match history is currently available for this
                        team in the {season} season.
                      </p>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default VolleyballTeamDetailsPage;