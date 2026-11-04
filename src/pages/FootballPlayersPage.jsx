import React, { useEffect, useState } from "react";
import {
  getFootballPlayers,
  getFootballCountries,
  getFootballLeagues
} from "../services/footballService";
import "../styles/Football.css";

function FootballPlayersPage() {
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [players, setPlayers] = useState([]);

  const [country, setCountry] = useState("");
  const [league, setLeague] = useState("");
  const [season, setSeason] = useState("2024");
  const [search, setSearch] = useState("");

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
      setPlayers([]);
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

  const searchPlayers = async (e) => {
    e.preventDefault();

    if (!league) {
      setError("Please select a country and league first.");
      return;
    }

    if (search.trim().length < 3) {
      setError("Enter at least 3 letters to search.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const data = await getFootballPlayers({
        search: search.trim(),
        league: league,
        season: season
      });

      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="football-players">
      <h1>Football Players</h1>

      <form className="player-search" onSubmit={searchPlayers}>
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map(item => (
            <option key={item.code || item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={league}
          onChange={e => setLeague(e.target.value)}
          disabled={!country}
        >
          <option value="">Select League</option>
          {leagues.map(item => (
            <option key={item.league.id} value={item.league.id}>
              {item.league.name}
            </option>
          ))}
        </select>

        <select
          value={season}
          onChange={e => setSeason(e.target.value)}
        >
          <option value="2024">2024 Season</option>
          <option value="2023">2023 Season</option>
          <option value="2022">2022 Season</option>
        </select>

        <input
          type="text"
          placeholder="Search player name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading players...</p>}
      {error && <p className="player-error">{error}</p>}

      <div className="players-grid">
        {players.map(item => (
          <div
            className="player-card"
            key={item.player.id}
            onClick={() => {
              window.location.href = `/football/players/${item.player.id}`;
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={item.player.photo} alt={item.player.name} />
            <h3>{item.player.name}</h3>
            <p>{item.player.nationality || "Unknown"}</p>
            <p>Age: {item.player.age || "N/A"}</p>
            <p>{item.statistics?.[0]?.team?.name || "Club unavailable"}</p>
          </div>
        ))}
      </div>

      {searched && !loading && players.length === 0 && !error && (
        <p>No players found.</p>
      )}
    </div>
  );
}

export default FootballPlayersPage;