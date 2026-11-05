import React, { useEffect, useState } from "react";
import { getVolleyballStandings } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballStandingsPage() {
  const parts = window.location.pathname.split("/");
  const leagueId = parts[3];
  const season = parts[4];

  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getVolleyballStandings({
          league: leagueId,
          season,
        });

        setStandings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load volleyball standings.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [leagueId, season]);

  const allTeams = standings.flat(Infinity);
  const groups = {};

  allTeams.forEach((item) => {
    if (!item || typeof item !== "object") return;

    const groupName = item.group?.name || "Overall Standings";

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push(item);
  });

  return (
    <main className="volleyball-library-page">
      <div className="volleyball-page-container">
        <div className="volleyball-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/volleyball/leagues">Volleyball</a>
          <span>/</span>
          <strong>Standings</strong>
        </div>

        <section className="volleyball-page-hero">
          <div className="volleyball-hero-content">
            <span className="volleyball-eyebrow">
              LEAGUE TABLE
            </span>

            <h1>Volleyball Standings</h1>

            <p>
              Follow team performances, match records and points
              throughout the {season} competition season.
            </p>
          </div>

          <div className="volleyball-hero-icon" aria-hidden="true">
            🏆
          </div>
        </section>

        <button
          type="button"
          className="volleyball-back-button"
          onClick={() => window.history.back()}
        >
          ← Back to League
        </button>

        <section className="volleyball-directory-section">
          <div className="volleyball-section-heading">
            <div>
              <span className="volleyball-eyebrow">
                SEASON RESULTS
              </span>

              <h2>League Table</h2>

              <p>
                Team rankings and performance statistics.
              </p>
            </div>

            <span className="volleyball-count">
              Season {season}
            </span>
          </div>

          {loading ? (
            <div className="volleyball-state">
              <div className="volleyball-loader" />
              <h3>Loading standings</h3>
              <p>Fetching team rankings and match statistics...</p>
            </div>
          ) : error ? (
            <div className="volleyball-state volleyball-error-state">
              <h3>Unable to load standings</h3>
              <p>{error}</p>
            </div>
          ) : Object.keys(groups).length === 0 ? (
            <div className="volleyball-state">
              <h3>No standings available</h3>
              <p>
                No standings are currently available for this league
                and season.
              </p>
            </div>
          ) : (
            <div className="volleyball-standings-groups">
              {Object.entries(groups).map(([groupName, teams]) => (
                <section
                  className="volleyball-standings-group"
                  key={groupName}
                >
                  <div className="volleyball-standings-group-heading">
                    <div>
                      <span className="volleyball-eyebrow">
                        COMPETITION TABLE
                      </span>

                      <h2>{groupName}</h2>
                    </div>

                    <span className="volleyball-count">
                      {teams.length} teams
                    </span>
                  </div>

                  <div className="volleyball-table-scroll">
                    <table className="volleyball-standings-table">
                      <thead>
                        <tr>
                          <th>Pos</th>
                          <th>Team</th>
                          <th>Played</th>
                          <th>Won</th>
                          <th>Lost</th>
                          <th>Sets For</th>
                          <th>Sets Against</th>
                          <th>Points</th>
                        </tr>
                      </thead>

                      <tbody>
                        {teams.map((item, index) => (
                          <tr key={item.team?.id || index}>
                            <td className="volleyball-position">
                              {item.position || index + 1}
                            </td>

                            <td>
                              <div className="volleyball-standing-team">
                                {item.team?.logo ? (
                                  <img
                                    src={item.team.logo}
                                    alt={item.team.name || "Team"}
                                    loading="lazy"
                                  />
                                ) : (
                                  <span className="volleyball-standing-placeholder">
                                    🏐
                                  </span>
                                )}

                                <strong>
                                  {item.team?.name || "Unknown team"}
                                </strong>
                              </div>
                            </td>

                            <td>{item.games?.played ?? "-"}</td>
                            <td className="volleyball-wins">
                              {item.games?.win?.total ?? "-"}
                            </td>
                            <td>{item.games?.lose?.total ?? "-"}</td>
                            <td>{item.goals?.for ?? "-"}</td>
                            <td>{item.goals?.against ?? "-"}</td>
                            <td className="volleyball-points">
                              {item.points ?? "-"}
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

export default VolleyballStandingsPage;