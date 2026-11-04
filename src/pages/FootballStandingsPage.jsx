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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getFootballCountries();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLeagues([]);
      setLeague("");
      setStandings([]);
      setSearched(false);

      if (!country) return;

      try {
        const data = await getFootballLeagues({ country });
        setLeagues(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, [country]);

  const searchStandings = async (e) => {
    e.preventDefault();

    if (!league) {
      setError("Please select a country and league.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const data = await getFootballStandings({
        league: league,
        season: season
      });

      setStandings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const table = standings[0]?.league?.standings || [];

  return (
    <div className="football-standings">
      <h1>Football Standings</h1>

      <form className="standing-filters" onSubmit={searchStandings}>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((item) => (
            <option key={item.code || item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={league}
          onChange={(e) => setLeague(e.target.value)}
          disabled={!country}
        >
          <option value="">Select League</option>
          {leagues.map((item) => (
            <option key={item.league.id} value={item.league.id}>
              {item.league.name}
            </option>
          ))}
        </select>

        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="2024">2024 Season</option>
          <option value="2023">2023 Season</option>
          <option value="2022">2022 Season</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p className="standing-error">{error}</p>}

      {loading && <p>Loading standings...</p>}

      {!loading && searched && table.length === 0 && !error && (
        <p>No standings found for this league and season.</p>
      )}

      {table.map((group, index) => (
        <div className="standing-group" key={index}>
          {group[0]?.group && <h2>{group[0].group}</h2>}

          <div className="standing-table-wrapper">
            <table className="standing-table">
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Pts</th>
                  <th>Form</th>
                </tr>
              </thead>

              <tbody>
                {group.map((item) => (
                  <tr key={item.team.id}>
                    <td>{item.rank}</td>
                    <td className="standing-team">
                      <img src={item.team.logo} alt={item.team.name} />
                      {item.team.name}
                    </td>
                    <td>{item.all?.played ?? "N/A"}</td>
                    <td>{item.all?.win ?? "N/A"}</td>
                    <td>{item.all?.draw ?? "N/A"}</td>
                    <td>{item.all?.lose ?? "N/A"}</td>
                    <td>{item.all?.goals?.for ?? "N/A"}</td>
                    <td>{item.all?.goals?.against ?? "N/A"}</td>
                    <td>{item.goalsDiff ?? "N/A"}</td>
                    <td>{item.points ?? "N/A"}</td>
                    <td>{item.form || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FootballStandingsPage;