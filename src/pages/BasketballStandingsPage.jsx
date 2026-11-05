
import React, { useEffect, useState } from "react";
import { getBasketballStandings } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballStandingsPage() {
  const parts = window.location.pathname.split("/");
  const leagueId = parts[3];
  const season = parts[4];

  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");
        setApiMessage("");

        const data = await getBasketballStandings({
          league: leagueId,
          season,
        });

        if (!data || data.length === 0) {
          setApiMessage(
            "Standings are unavailable for this season on your current API plan."
          );
        } else {
          setStandings(data);
        }
      } catch (err) {
        setError(err.message || "Unable to load league standings.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [leagueId, season]);

  const goBack = () => window.history.back();

  if (loading) {
    return (
      <main className="basketball-library-page">
        <div className="basketball-page-container">
          <div className="basketball-state">
            <div className="basketball-loader"></div>
            <h3>Loading standings</h3>
            <p>Preparing the league table...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="basketball-library-page">
        <div className="basketball-page-container">
          <div className="basketball-state basketball-error">
            <span>!</span>
            <h3>Unable to load standings</h3>
            <p>{error}</p>
            <button className="basketball-back-button" onClick={goBack}>
              ← Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  const groups = standings.map((group) =>
    Array.isArray(group) ? group : [group]
  );

  return (
    <main className="basketball-library-page">
      <div className="basketball-page-container">
        <div className="basketball-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Basketball</span>
          <span>/</span>
          <span>Standings</span>
          <span>/</span>
          <strong>{season}</strong>
        </div>

        <button className="basketball-back-button" onClick={goBack}>
          ← Back to League
        </button>

        <section className="basketball-page-hero basketball-standings-hero">
          <div className="basketball-hero-content">
            <span className="basketball-eyebrow">
              THE COMPETITION TABLE
            </span>

            <h1>League Standings</h1>

            <p>
              Follow team positions and performance throughout the {season} season.
            </p>
          </div>

          <div className="basketball-hero-decoration" aria-hidden="true">
            <span>🏆</span>
          </div>
        </section>

        <section className="basketball-directory-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">
                SEASON OVERVIEW
              </span>
              <h2>Team Rankings</h2>
              <p>Compare team performance in the competition.</p>
            </div>

            <span className="basketball-result-count">
              Season {season}
            </span>
          </div>

          {standings.length === 0 ? (
            <div className="basketball-state">
              <span>🏀</span>
              <h3>Standings unavailable</h3>
              <p>
                {apiMessage ||
                  "No standings are available for this league and season."}
              </p>
            </div>
          ) : (
            <div className="basketball-standings-groups">
              {groups.map((teams, index) => (
                <section
                  className="basketball-standings-group"
                  key={index}
                >
                  <div className="basketball-standings-group-header">
                    <div>
                      <span className="basketball-eyebrow">
                        COMPETITION RANKINGS
                      </span>
                      <h3>
                        {groups.length > 1
                          ? `Group ${index + 1}`
                          : "League Table"}
                      </h3>
                    </div>

                    <span className="basketball-result-count">
                      {teams.length} teams
                    </span>
                  </div>

                  <div className="basketball-table-scroll">
                    <table className="basketball-standings-table">
                      <thead>
                        <tr>
                          <th>POS</th>
                          <th>TEAM</th>
                          <th>PLAYED</th>
                          <th>WON</th>
                          <th>LOST</th>
                          <th>POINTS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {teams.map((team, teamIndex) => (
                          <tr key={team.team?.id || teamIndex}>
                            <td>
                              <span className="basketball-position">
                                {team.position || teamIndex + 1}
                              </span>
                            </td>

                            <td>
                              <div className="basketball-standing-team">
                                {team.team?.logo ? (
                                  <img
                                    src={team.team.logo}
                                    alt={`${team.team.name} logo`}
                                    loading="lazy"
                                  />
                                ) : (
                                  <span className="basketball-team-placeholder">
                                    🏀
                                  </span>
                                )}

                                <strong>
                                  {team.team?.name || "Unknown team"}
                                </strong>
                              </div>
                            </td>

                            <td>{team.games?.played ?? "-"}</td>
                            <td className="basketball-stat-win">
                              {team.games?.win?.total ?? "-"}
                            </td>
                            <td>{team.games?.lose?.total ?? "-"}</td>
                            <td>
                              <strong className="basketball-standing-points">
                                {team.points ?? "-"}
                              </strong>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default BasketballStandingsPage;
