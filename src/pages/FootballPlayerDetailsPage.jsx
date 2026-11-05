
import React, { useEffect, useState } from "react";
import "../styles/Football.css";
import {
  getPlayerDetails,
  getPlayerTeams
} from "../services/footballService";

function FootballPlayerDetailsPage() {
  const id = window.location.pathname.split("/")[3];

  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [teamsLoading, setTeamsLoading] = useState(true);

  const [error, setError] = useState("");
  const [teamsError, setTeamsError] = useState("");

  useEffect(() => {
    let active = true;

    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPlayerDetails(id, 2024);

        if (!active) return;

        if (!Array.isArray(data) || data.length === 0) {
          setError("Player details not found for this season.");
        } else {
          setPlayer(data[0].player);
          setStats(data[0].statistics || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load player details.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    const getCareerData = async () => {
      try {
        setTeamsLoading(true);
        setTeamsError("");

        const teamData = await getPlayerTeams(id);

        if (active) {
          setTeams(Array.isArray(teamData) ? teamData : []);
        }
      } catch (err) {
        if (active) {
          setTeamsError(err.message || "Unable to load career history.");
        }
      } finally {
        if (active) {
          setTeamsLoading(false);
        }
      }
    };

    getData();
    getCareerData();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="football-library-page">
        <div className="football-page-container">
          <div className="football-state">
            <div className="football-loader" />
            <h3>Loading player profile</h3>
            <p>Gathering player information and statistics...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !player) {
    return (
      <main className="football-library-page">
        <div className="football-page-container">
          <div className="football-state football-error">
            <h3>Player profile unavailable</h3>
            <p>{error || "Player not found."}</p>
            <button
              className="football-back-button"
              onClick={() => window.history.back()}
            >
              Back to Players
            </button>
          </div>
        </div>
      </main>
    );
  }

  const nationalStats = stats.filter(
    (item) => item.team?.name === player.nationality
  );

  const nationalTeam = teams.find(
    (item) => item.team?.name === player.nationality
  );

  const internationalAppearances = nationalStats.some(
    (item) => item.games?.appearances != null
  )
    ? nationalStats.reduce(
        (total, item) => total + (item.games?.appearances || 0),
        0
      )
    : "N/A";

  const internationalGoals = nationalStats.reduce(
    (total, item) => total + (item.goals?.total || 0),
    0
  );

  const internationalAssists = nationalStats.reduce(
    (total, item) => total + (item.goals?.assists || 0),
    0
  );

  const statCards = [
    {
      label: "Appearances",
      value: internationalAppearances
    },
    {
      label: "Goals",
      value: internationalGoals
    },
    {
      label: "Assists",
      value: internationalAssists
    }
  ];

  return (
    <main className="football-library-page">
      <div className="football-page-container">

        <div className="football-breadcrumb">
          <span>Sports</span>
          <span>/</span>
          <span>Football</span>
          <span>/</span>
          <span>Players</span>
          <span>/</span>
          <strong>{player.name}</strong>
        </div>

        <button
          className="football-back-button"
          onClick={() => window.history.back()}
        >
          ← Back to Players
        </button>

        {/* PLAYER PROFILE */}

        <section className="football-player-profile-hero">
          <div className="football-player-profile-photo">
            {player.photo ? (
              <img src={player.photo} alt={player.name} />
            ) : (
              <span>⚽</span>
            )}
          </div>

          <div className="football-player-profile-content">
            <span className="football-eyebrow">PLAYER PROFILE</span>

            <h1>{player.name}</h1>

            <p className="football-player-nationality">
              {player.nationality || "Nationality unavailable"}
            </p>

            <div className="football-player-profile-tags">
              <span>Age: {player.age ?? "N/A"}</span>
              <span>Height: {player.height || "N/A"}</span>
              <span>Weight: {player.weight || "N/A"}</span>
              <span>
                {player.injured ? "Currently injured" : "Not marked injured"}
              </span>
            </div>
          </div>

          <div className="football-player-profile-watermark">
            ⚽
          </div>
        </section>

        {/* COMPETITION STATISTICS */}

        <section className="football-detail-section">
          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">SEASON PERFORMANCE</span>
              <h2>Competition Statistics</h2>
              <p>Player performance across competitions in 2024.</p>
            </div>

            <span className="football-result-count">2024 Season</span>
          </div>

          {stats.length === 0 ? (
            <div className="football-state">
              <h3>No statistics available</h3>
              <p>Competition statistics are not available for this season.</p>
            </div>
          ) : (
            <div className="football-competition-list">
              {stats.map((item, index) => {
                const statistics = [
                  {
                    label: "Team",
                    value: item.team?.name || "N/A"
                  },
                  {
                    label: "Position",
                    value: item.games?.position || "N/A"
                  },
                  {
                    label: "Appearances",
                    value: item.games?.appearances ?? "N/A"
                  },
                  {
                    label: "Starts",
                    value: item.games?.lineups ?? "N/A"
                  },
                  {
                    label: "Minutes",
                    value: item.games?.minutes ?? "N/A"
                  },
                  {
                    label: "Rating",
                    value: item.games?.rating || "N/A"
                  },
                  {
                    label: "Goals",
                    value: item.goals?.total ?? "N/A"
                  },
                  {
                    label: "Assists",
                    value: item.goals?.assists ?? "N/A"
                  },
                  {
                    label: "Saves",
                    value: item.goals?.saves ?? "N/A"
                  },
                  {
                    label: "Yellow Cards",
                    value: item.cards?.yellow ?? "N/A"
                  },
                  {
                    label: "Red Cards",
                    value: item.cards?.red ?? "N/A"
                  }
                ];

                return (
                  <article
                    className="football-competition-card"
                    key={`${item.league?.id || "competition"}-${index}`}
                  >
                    <div className="football-competition-heading">
                      <div>
                        <span className="football-eyebrow">
                          COMPETITION {index + 1}
                        </span>
                        <h3>{item.league?.name || "Competition"}</h3>
                      </div>

                      <span className="football-competition-season">
                        2024
                      </span>
                    </div>

                    <div className="football-competition-stats">
                      {statistics.map((stat) => (
                        <div
                          className="football-competition-stat"
                          key={stat.label}
                        >
                          <span>{stat.label}</span>
                          <strong>{stat.value}</strong>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* NATIONAL TEAM */}

        <section className="football-detail-section">
          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">INTERNATIONAL CAREER</span>
              <h2>National Team Profile</h2>
              <p>International representation and performance.</p>
            </div>
          </div>

          {nationalStats.length > 0 ? (
            <>
              <div className="football-national-profile">
                <div className="football-national-logo">
                  {nationalTeam?.team?.logo ? (
                    <img
                      src={nationalTeam.team.logo}
                      alt={player.nationality}
                    />
                  ) : (
                    <span>🌍</span>
                  )}
                </div>

                <div>
                  <h3>{player.nationality}</h3>
                  <p>International Career</p>
                </div>
              </div>

              <div className="football-national-stats">
                {statCards.map((stat) => (
                  <div
                    className="football-national-stat-card"
                    key={stat.label}
                  >
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="football-state">
              <h3>No national team statistics</h3>
              <p>
                No national team statistics are available for this player
                in the 2024 season.
              </p>
            </div>
          )}
        </section>

        {/* CAREER HISTORY */}

        <section className="football-detail-section">
          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">CLUB JOURNEY</span>
              <h2>Career History</h2>
              <p>Teams and seasons associated with this player.</p>
            </div>

            <span className="football-result-count">
              {teamsLoading ? "Loading..." : `${teams.length} teams`}
            </span>
          </div>

          {teamsLoading && (
            <div className="football-state">
              <div className="football-loader" />
              <h3>Loading career history</h3>
            </div>
          )}

          {!teamsLoading && teamsError && (
            <div className="football-state football-error">
              <h3>Career history unavailable</h3>
              <p>{teamsError}</p>
            </div>
          )}

          {!teamsLoading && !teamsError && teams.length === 0 && (
            <div className="football-state">
              <h3>No career history available</h3>
              <p>There are no team records available for this player.</p>
            </div>
          )}

          {!teamsLoading && teams.length > 0 && (
            <div className="football-career-grid">
              {teams.map((item, index) => (
                <article
                  className="football-career-card"
                  key={item.team?.id || index}
                >
                  <div className="football-career-logo">
                    {item.team?.logo ? (
                      <img
                        src={item.team.logo}
                        alt={item.team.name}
                      />
                    ) : (
                      <span>⚽</span>
                    )}
                  </div>

                  <h3>{item.team?.name || "Unknown team"}</h3>

                  <p>
                    {item.seasons?.length
                      ? item.seasons.join(", ")
                      : "Seasons unavailable"}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default FootballPlayerDetailsPage;
