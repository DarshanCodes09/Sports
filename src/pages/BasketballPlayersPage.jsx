import React, { useEffect, useState } from "react";
import {
  getBasketballTeams,
  getBasketballPlayers,
} from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballPlayersPage() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [season, setSeason] = useState("2023");
  const [search, setSearch] = useState("");
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTeams = async () => {
      try {
        const data = await getBasketballTeams({ country: "USA" });
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingTeams(false);
      }
    };

    getTeams();
  }, []);

  const searchPlayers = async () => {
    if (!teamId) {
      setError("Please select a team.");
      return;
    }

    setLoadingPlayers(true);
    setError("");
    setPlayers([]);

    try {
      const data = await getBasketballPlayers({
        team: teamId,
        season: season,
      });

      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPlayers(false);
    }
  };

  const filteredPlayers = players.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="basketball-players">
      <h1>Basketball Players</h1>

      {loadingTeams ? (
        <p>Loading teams...</p>
      ) : (
        <div className="player-filters">
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
          >
            <option value="">Select a Team</option>

            {teams.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>

          <button onClick={searchPlayers}>
            Search Players
          </button>
        </div>
      )}

      <input
        type="text"
        className="team-search"
        placeholder="Search player name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p>{error}</p>}

      {loadingPlayers && <h3>Loading players...</h3>}

      {!loadingPlayers && players.length > 0 && (
        <p>Showing {filteredPlayers.length} players</p>
      )}

      <div className="players-grid">
        {filteredPlayers.map((item) => (
          <div
  className="player-card"
  key={item.id}
  onClick={() => {
    const params = new URLSearchParams({
      name: item.name,
      number: item.number || "",
      position: item.position || "",
      country: item.country || "",
      age: item.age || "",
      team: teams.find((team) => String(team.id) === String(teamId))?.name || "",
      season: season,
    });

    window.location.href = `/basketball/player/${item.id}?${params.toString()}`;
  }}
  style={{ cursor: "pointer" }}
>
            <h3>{item.name.replaceAll("&apos;", "'")}</h3>

            <p>Jersey: {item.number || "N/A"}</p>
            <p>Position: {item.position || "N/A"}</p>
            <p>Country: {item.country || "N/A"}</p>
            <p>Age: {item.age || "N/A"}</p>
          </div>
        ))}
      </div>

      {!loadingPlayers && players.length > 0 && filteredPlayers.length === 0 && (
        <p>No players match your search.</p>
      )}

      {!loadingPlayers && teamId && players.length === 0 && !error && (
        <p>No players found for this team and season.</p>
      )}
    </div>
  );
}

export default BasketballPlayersPage;