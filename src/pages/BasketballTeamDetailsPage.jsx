
import React, { useEffect, useState } from "react";
import {
  getBasketballTeams,
  getBasketballPlayers,
} from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballTeamDetailsPage() {
  const teamId = window.location.pathname.split("/").pop();

  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [season, setSeason] = useState("2023");
  const [loading, setLoading] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await getBasketballTeams({ id: teamId });

        const selectedTeam = data.find(
          (item) => String(item.id) === String(teamId)
        );

        if (selectedTeam) {
          setTeam(selectedTeam);
        } else {
          setError("Team not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, [teamId]);

  const loadPlayers = async () => {
    setLoadingPlayers(true);
    setError("");

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

  if (loading) return <h2>Loading team details...</h2>;
  if (error && !team) return <h2>{error}</h2>;
  if (!team) return <h2>Team not found.</h2>;

  return (
    <div className="basketball-team-details">

      <button onClick={() => window.history.back()}>
        ← Back to Teams
      </button>

      <div className="team-details-header">
        <img src={team.logo} alt={team.name} />

        <div>
          <h1>{team.name}</h1>
          <p>Country: {team.country?.name || "N/A"}</p>
          <p>Team ID: {team.id}</p>
        </div>
      </div>

      <h2>Team Squad</h2>

      <div className="player-filters">
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        <button onClick={loadPlayers}>
          Load Squad
        </button>
      </div>

      {loadingPlayers && <p>Loading squad...</p>}

      {error && <p>{error}</p>}

      {!loadingPlayers && players.length > 0 && (
        <p>Showing {players.length} players</p>
      )}

      <div className="players-grid">
        {players.map((item) => (
          <div
            className="player-card"
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              const params = new URLSearchParams({
                name: item.name,
                number: item.number || "",
                position: item.position || "",
                country: item.country || "",
                age: item.age || "",
                team: team.name,
                season: season,
              });

              window.location.href =
                `/basketball/player/${item.id}?${params.toString()}`;
            }}
          >
            <h3>{item.name}</h3>
            <p>Jersey: {item.number || "N/A"}</p>
            <p>Position: {item.position || "N/A"}</p>
            <p>Country: {item.country || "N/A"}</p>
            <p>Age: {item.age || "N/A"}</p>
          </div>
        ))}
      </div>

      {!loadingPlayers && players.length === 0 && (
        <p>Select a season and click Load Squad.</p>
      )}

    </div>
  );
}

export default BasketballTeamDetailsPage;
