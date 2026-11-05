import React, { useEffect, useState } from "react";
import {
  getCompetitionDetails,
  getCompetitionSeasons,
  getCompetitionSeason,
} from "../services/cricketService";
import "../styles/CricketLists.css";

export default function LeagueTeamsPage() {
  const leagueId = window.location.pathname.split("/")[2];

  const [league, setLeague] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seasonLoading, setSeasonLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLeague() {
      try {
        setLoading(true);
        setError("");

        const [details, seasonResult] = await Promise.all([
          getCompetitionDetails(leagueId),
          getCompetitionSeasons(leagueId),
        ]);

        if (active) {
          setLeague(details);
          setSeasons(seasonResult?.seasons || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load competition details.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadLeague();

    return () => {
      active = false;
    };
  }, [leagueId]);

  useEffect(() => {
    if (!selectedSeason) {
      setSeasonData(null);
      return;
    }

    let active = true;

    async function loadSeason() {
      try {
        setSeasonLoading(true);
        setSeasonData(null);

        const data = await getCompetitionSeason(
          leagueId,
          selectedSeason
        );

        if (active) setSeasonData(data);
      } catch (err) {
        if (active) {
          console.error("Season details error:", err.message);
          setSeasonData(null);
        }
      } finally {
        if (active) setSeasonLoading(false);
      }
    }

    loadSeason();

    return () => {
      active = false;
    };
  }, [leagueId, selectedSeason]);

  function formatNumber(value) {
    if (value === null || value === undefined || value === "") {
      return "—";
    }

    return typeof value === "number"
      ? value.toLocaleString("en-IN")
      : value;
  }

  function showPlayers(players, type) {
    if (!players?.length) {
      return (
        <div className="cricket-league-empty">
          No player records available.
        </div>
      );
    }

    return (
      <div className="cricket-record-grid">
        {players.map((player, index) => (
          <button
            className="cricket-record-card"
            key={player.player || index}
            onClick={() => {
              if (player.player) {
                window.location.href = `/players/${player.player}`;
              }
            }}
            disabled={!player.player}
          >
            <span className="cricket-record-rank">
              #{index + 1}
            </span>

            <div className="cricket-record-info">
              <strong>{player.name || player.player}</strong>
              <span>
                {type === "runs"
                  ? `${formatNumber(player.runs)} runs`
                  : `${formatNumber(player.wickets)} wickets`}
              </span>
            </div>

            {player.player && (
              <span className="cricket-record-arrow">↗</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <main className="cricket-library-page">
        <div className="cricket-page-container">
          <div className="cricket-state-card">
            <div className="cricket-loader" />
            <h3>Loading competition</h3>
            <p>Gathering tournament information.</p>
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
            <h3>Competition unavailable</h3>
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

  if (!league) {
    return (
      <main className="cricket-library-page">
        <div className="cricket-page-container">
          <div className="cricket-state-card">
            <h3>Competition not found</h3>
            <p>We couldn't find this cricket competition.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cricket-library-page">
      <div className="cricket-page-container">

        {/* BREADCRUMB */}

        <div className="cricket-breadcrumb">
          <button onClick={() => (window.location.href = "/leagues")}>
            Cricket Leagues
          </button>
          <span>/</span>
          <span>{league.name || league.competition}</span>
        </div>

        {/* COMPETITION HERO */}

        <section className="cricket-league-detail-hero">
          <div className="cricket-league-detail-content">
            <span className="cricket-eyebrow">
              CRICKET COMPETITION
            </span>

            <h1>{league.name || league.competition}</h1>

            <p>
              {league.country || "International competition"}
              {" · "}
              {league.kind || "Cricket tournament"}
            </p>
          </div>

          <div className="cricket-league-detail-art">
            🏆
          </div>
        </section>

        {/* COMPETITION OVERVIEW */}

        <section className="cricket-detail-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">
                TOURNAMENT OVERVIEW
              </span>
              <h2>Competition details</h2>
            </div>
          </div>

          <div className="cricket-details-grid">
            <div>
              <span>Competition</span>
              <strong>{league.name || "—"}</strong>
            </div>

            <div>
              <span>Country</span>
              <strong>{league.country || "—"}</strong>
            </div>

            <div>
              <span>Format / Type</span>
              <strong>{league.kind || "—"}</strong>
            </div>

            <div>
              <span>Total matches</span>
              <strong>{formatNumber(league.matches)}</strong>
            </div>
          </div>
        </section>

        {/* ALL TIME RECORDS */}

        <section className="cricket-detail-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">
                HISTORICAL LEADERS
              </span>
              <h2>All-time records</h2>
            </div>
          </div>

          <div className="cricket-record-section">
            <div className="cricket-record-heading">
              <span className="cricket-record-symbol">🏏</span>
              <div>
                <h3>Most runs</h3>
                <p>Leading run scorers in this competition</p>
              </div>
            </div>

            {showPlayers(league.most_runs, "runs")}
          </div>

          <div className="cricket-record-section">
            <div className="cricket-record-heading">
              <span className="cricket-record-symbol">🎯</span>
              <div>
                <h3>Most wickets</h3>
                <p>Leading wicket takers in this competition</p>
              </div>
            </div>

            {showPlayers(league.most_wickets, "wickets")}
          </div>
        </section>

        {/* SEASON SELECTOR */}

        <section className="cricket-detail-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">
                TOURNAMENT HISTORY
              </span>
              <h2>Season-wise records</h2>
            </div>
          </div>

          {seasons.length > 0 ? (
            <>
              <div className="cricket-season-selector">
                <label htmlFor="cricket-season">
                  Select a season
                </label>

                <select
                  id="cricket-season"
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                >
                  <option value="">Choose a season</option>

                  {seasons.map((season) => (
                    <option
                      key={season.season}
                      value={season.season}
                    >
                      {season.season}
                    </option>
                  ))}
                </select>
              </div>

              {seasonLoading && (
                <div className="cricket-state-card">
                  <div className="cricket-loader" />
                  <h3>Loading season records</h3>
                  <p>Gathering tournament results and statistics.</p>
                </div>
              )}

              {!seasonLoading && selectedSeason && !seasonData && (
                <div className="cricket-state-card">
                  <h3>Season details unavailable</h3>
                  <p>We couldn't load the selected season records.</p>
                </div>
              )}

              {!seasonLoading && seasonData && (
                <div className="cricket-season-content">

                  {/* CHAMPION */}

                  <div className="cricket-champion-card">
                    <span>SEASON CHAMPION</span>
                    <h3>{seasonData.champion || "Not available"}</h3>
                    <p>{selectedSeason} Season</p>
                  </div>

                  {/* POINTS TABLE */}

                  <section className="cricket-season-section">
                    <div className="cricket-season-heading">
                      <span className="cricket-eyebrow">
                        TEAM STANDINGS
                      </span>
                      <h3>Points table</h3>
                    </div>

                    {seasonData.table?.length ? (
                      <div className="cricket-table-wrapper">
                        <table className="cricket-points-table">
                          <thead>
                            <tr>
                              <th>Team</th>
                              <th>Played</th>
                              <th>Won</th>
                              <th>Lost</th>
                            </tr>
                          </thead>

                          <tbody>
                            {seasonData.table.map((team, index) => (
                              <tr key={team.team || index}>
                                <td>{team.team || team.name}</td>
                                <td>{formatNumber(team.played)}</td>
                                <td>{formatNumber(team.won)}</td>
                                <td>{formatNumber(team.lost)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="cricket-league-empty">
                        No points table available.
                      </div>
                    )}
                  </section>

                  {/* SEASON RUNS */}

                  <section className="cricket-season-section">
                    <div className="cricket-season-heading">
                      <span className="cricket-eyebrow">
                        BATTING LEADERS
                      </span>
                      <h3>Season most runs</h3>
                    </div>

                    {showPlayers(seasonData.most_runs, "runs")}
                  </section>

                  {/* SEASON WICKETS */}

                  <section className="cricket-season-section">
                    <div className="cricket-season-heading">
                      <span className="cricket-eyebrow">
                        BOWLING LEADERS
                      </span>
                      <h3>Season most wickets</h3>
                    </div>

                    {showPlayers(seasonData.most_wickets, "wickets")}
                  </section>

                  {/* MATCH RESULTS */}

                  <section className="cricket-season-section">
                    <div className="cricket-season-heading">
                      <span className="cricket-eyebrow">
                        MATCH CENTRE
                      </span>
                      <h3>Match results</h3>
                    </div>

                    {seasonData.results?.length ? (
                      <div className="cricket-match-list">
                        {seasonData.results.map((match, index) => (
                          <article
                            className="cricket-match-card"
                            key={match.match || index}
                          >
                            <span className="cricket-match-date">
                              {match.date || "Date unavailable"}
                            </span>

                            <div className="cricket-match-teams">
                              {match.teams?.map((team, teamIndex) => (
                                <div
                                  className="cricket-match-team"
                                  key={teamIndex}
                                >
                                  <strong>{team.name}</strong>
                                  <span>
                                    {team.score || "No score"}
                                  </span>

                                  {team.won && (
                                    <span className="cricket-winner-label">
                                      WINNER
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>

                            <p className="cricket-match-result">
                              {match.result || "Result unavailable"}
                            </p>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="cricket-league-empty">
                        No match results available.
                      </div>
                    )}
                  </section>
                </div>
              )}
            </>
          ) : (
            <div className="cricket-state-card">
              <p>
                Season information is not available for this competition.
              </p>
            </div>
          )}
        </section>

        <div className="cricket-detail-footer">
          <button
            className="cricket-pagination-button"
            onClick={() => (window.location.href = "/leagues")}
          >
            ← Back to leagues
          </button>
        </div>

      </div>
    </main>
  );
}