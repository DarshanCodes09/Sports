
import React, { useEffect, useState } from "react";
import {
  getFootballCountries,
  getFootballLeagues,
  getFootballStandings
} from "../services/footballService";
import "../styles/Football.css";

function FootballStandingsPage() {
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [standings, setStandings] = useState([]);

  const [country, setCountry] = useState("");
  const [league, setLeague] = useState("");
  const [season, setSeason] = useState("2024");

  const [countriesLoading, setCountriesLoading] = useState(true);
  const [leaguesLoading, setLeaguesLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    let active = true;

    const getData = async () => {
      try {
        const data = await getFootballCountries();

        if (active) {
          setCountries(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load countries.");
        }
      } finally {
        if (active) {
          setCountriesLoading(false);
        }
      }
    };

    getData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    setLeagues([]);
    setLeague("");
    setStandings([]);
    setSearched(false);
    setError("");

    if (!country) {
      setLeaguesLoading(false);

      return () => {
        active = false;
      };
    }

    const getData = async () => {
      try {
        setLeaguesLoading(true);

        const data = await getFootballLeagues({ country });

        if (active) {
          setLeagues(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load leagues.");
        }
      } finally {
        if (active) {
          setLeaguesLoading(false);
        }
      }
    };

    getData();

    return () => {
      active = false;
    };
  }, [country]);

  const searchStandings = async (e) => {
    e.preventDefault();

    if (!country || !league) {
      setError("Please select a country and league.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);
      setStandings([]);

      const data = await getFootballStandings({
        league,
        season
      });

      setStandings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load standings.");
    } finally {
      setLoading(false);
    }
  };

  const table = standings[0]?.league?.standings || [];
  const selectedLeague = leagues.find(
    (item) => String(item.league?.id) === String(league)
  );

  const totalTeams = table.reduce(
    (total, group) => total + group.length,
    0
  );

  return (
    <main className="football-library-page">
      <div className="football-page-container">

        <div className="football-breadcrumb">
          <span>Sports</span>
          <span>/</span>
          <span>Football</span>
          <span>/</span>
          <strong>Standings</strong>
        </div>

        <section className="football-page-hero">
          <div className="football-page-hero-content">
            <span className="football-eyebrow">THE LEAGUE TABLE</span>
            <h1>Football Standings</h1>
            <p>
              Follow the competition. Explore team positions,
              match records, points and performance across leagues.
            </p>
          </div>

          <div className="football-hero-decoration" aria-hidden="true">
            🏆
          </div>
        </section>

        <section className="football-directory-section">

          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">COMPETITION RANKINGS</span>
              <h2>League Table</h2>
              <p>Select a country, league and season to view the standings.</p>
            </div>

            <span className="football-result-count">
              {loading ? "Loading..." : `${totalTeams} teams`}
            </span>
          </div>

          <form
            className="football-standings-filter-panel"
            onSubmit={searchStandings}
          >
            <div className="football-standing-filter">
              <label htmlFor="standing-country">Country</label>
              <select
                id="standing-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={countriesLoading}
              >
                <option value="">
                  {countriesLoading ? "Loading countries..." : "Select Country"}
                </option>

                {countries.map((item) => (
                  <option
                    key={item.code || item.name}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="football-standing-filter">
              <label htmlFor="standing-league">League</label>
              <select
                id="standing-league"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
                disabled={!country || leaguesLoading}
              >
                <option value="">
                  {leaguesLoading ? "Loading leagues..." : "Select League"}
                </option>

                {leagues.map((item) => (
                  <option
                    key={item.league.id}
                    value={item.league.id}
                  >
                    {item.league.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="football-standing-filter">
              <label htmlFor="standing-season">Season</label>
              <select
                id="standing-season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="2024">2024 Season</option>
                <option value="2023">2023 Season</option>
                <option value="2022">2022 Season</option>
              </select>
            </div>

            <button
              type="submit"
              className="football-standing-search-button"
              disabled={loading || leaguesLoading}
            >
              {loading ? "Loading..." : "View Standings"}
              <span>↗</span>
            </button>
          </form>

          {error && (
            <div className="football-player-error">
              {error}
            </div>
          )}

          {loading && (
            <div className="football-state">
              <div className="football-loader" />
              <h3>Loading standings</h3>
              <p>Retrieving the latest available league table...</p>
            </div>
          )}

          {!loading && searched && !error && table.length === 0 && (
            <div className="football-state">
              <h3>No standings available</h3>
              <p>
                No standings were found for this league and season.
              </p>
            </div>
          )}

          {!loading && !searched && !error && (
            <div className="football-player-initial-state">
              <span>🏆</span>
              <h3>Every point counts</h3>
              <p>
                Choose a competition and season to explore
                the league table and team rankings.
              </p>
            </div>
          )}

          {!loading && table.length > 0 && (
            <div className="football-standing-results">

              <div className="football-standing-summary">
                <div>
                  <span className="football-eyebrow">SELECTED COMPETITION</span>
                  <h2>
                    {standings[0]?.league?.name ||
                      selectedLeague?.league?.name ||
                      "League Standings"}
                  </h2>
                  <p>
                    {standings[0]?.league?.country || country} · {season} Season
                  </p>
                </div>

                {standings[0]?.league?.logo && (
                  <img
                    src={standings[0].league.logo}
                    alt={standings[0].league.name}
                  />
                )}
              </div>

              {table.map((group, index) => (
                <section
                  className="football-standing-group"
                  key={index}
                >
                  {group[0]?.group && (
                    <h3 className="football-standing-group-title">
                      {group[0].group}
                    </h3>
                  )}

                  <div className="football-standing-table-wrapper">
                    <table className="football-standing-table">
                      <thead>
                        <tr>
                          <th>POS</th>
                          <th className="football-standing-team-heading">TEAM</th>
                          <th>MP</th>
                          <th>W</th>
                          <th>D</th>
                          <th>L</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                          <th>PTS</th>
                          <th>FORM</th>
                        </tr>
                      </thead>

                      <tbody>
                        {group.map((item) => (
                          <tr
                            key={item.team.id}
                            className={
                              item.rank === 1
                                ? "football-standing-first"
                                : ""
                            }
                          >
                            <td>
                              <span className="football-standing-rank">
                                {item.rank}
                              </span>
                            </td>

                            <td className="football-standing-team">
                              {item.team.logo && (
                                <img
                                  src={item.team.logo}
                                  alt={item.team.name}
                                />
                              )}
                              <strong>{item.team.name}</strong>
                            </td>

                            <td>{item.all?.played ?? "N/A"}</td>
                            <td>{item.all?.win ?? "N/A"}</td>
                            <td>{item.all?.draw ?? "N/A"}</td>
                            <td>{item.all?.lose ?? "N/A"}</td>
                            <td>{item.all?.goals?.for ?? "N/A"}</td>
                            <td>{item.all?.goals?.against ?? "N/A"}</td>
                            <td>{item.goalsDiff ?? "N/A"}</td>

                            <td>
                              <strong className="football-standing-points">
                                {item.points ?? "N/A"}
                              </strong>
                            </td>

                            <td>
                              <div className="football-standing-form">
                                {item.form
                                  ? item.form.split("").map((result, i) => (
                                      <span
                                        key={i}
                                        className={`football-form-${result.toLowerCase()}`}
                                        title={
                                          result === "W"
                                            ? "Win"
                                            : result === "D"
                                            ? "Draw"
                                            : "Loss"
                                        }
                                      >
                                        {result}
                                      </span>
                                    ))
                                  : "N/A"}
                              </div>
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

export default FootballStandingsPage;
