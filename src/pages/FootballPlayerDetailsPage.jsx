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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(true);

useEffect(() => {
  const getData = async () => {
    try {
      const data = await getPlayerDetails(id, 2024);

      if (data.length === 0) {
        setError("Player details not found for this season.");
      } else {
        setPlayer(data[0].player);
        setStats(data[0].statistics || []);
      }

      const teamData = await getPlayerTeams(id);
      setTeams(teamData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTeamsLoading(false);
    }
  };

  getData();
}, [id]);

  if (loading) return <h2>Loading player details...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!player) return <h2>Player not found.</h2>;
const nationalStats = stats.filter(
  (item) => item.team?.name === player.nationality
);

const nationalTeam = teams.find(
  (item) => item.team?.name === player.nationality
);
  return (
    <div className="football-player-details">
      <button onClick={() => window.history.back()}>
        Back to Players
      </button>

      <div className="player-profile">
        <img src={player.photo} alt={player.name} />

        <div>
          <h1>{player.name}</h1>
          <p>Nationality: {player.nationality || "N/A"}</p>
          <p>Age: {player.age || "N/A"}</p>
          <p>Height: {player.height || "N/A"}</p>
          <p>Weight: {player.weight || "N/A"}</p>
          <p>Injured: {player.injured ? "Yes" : "No"}</p>
        </div>
      </div>

      <h2>Competition Statistics - 2024</h2>

      {stats.length === 0 && <p>No statistics available.</p>}

      {stats.map((item, index) => (
        <div className="player-competition" key={index}>
          <h2>{item.league?.name || "Competition"}</h2>

          <div className="player-stats">
            <div>
              <h3>{item.team?.name || "N/A"}</h3>
              <p>Team</p>
            </div>

            <div>
              <h3>{item.games?.position || "N/A"}</h3>
              <p>Position</p>
            </div>

            <div>
              <h3>{item.games?.appearances ?? "N/A"}</h3>
              <p>Appearances</p>
            </div>

            <div>
              <h3>{item.games?.lineups ?? "N/A"}</h3>
              <p>Starts</p>
            </div>

            <div>
              <h3>{item.games?.minutes ?? "N/A"}</h3>
              <p>Minutes</p>
            </div>

            <div>
              <h3>{item.games?.rating || "N/A"}</h3>
              <p>Rating</p>
            </div>

            <div>
              <h3>{item.goals?.total ?? "N/A"}</h3>
              <p>Goals</p>
            </div>

            <div>
              <h3>{item.goals?.assists ?? "N/A"}</h3>
              <p>Assists</p>
            </div>

            <div>
              <h3>{item.goals?.saves ?? "N/A"}</h3>
              <p>Saves</p>
            </div>

            <div>
              <h3>{item.cards?.yellow ?? "N/A"}</h3>
              <p>Yellow Cards</p>
            </div>

            <div>
              <h3>{item.cards?.red ?? "N/A"}</h3>
              <p>Red Cards</p>
            </div>
          </div>
        </div>
      ))}
      <h2>National Team Profile</h2>

{nationalStats.length > 0 ? (
  <>
    <div className="national-profile">
      {nationalTeam?.team?.logo && (
        <img
          src={nationalTeam.team.logo}
          alt={player.nationality}
        />
      )}

      <div>
        <h2>{player.nationality}</h2>
        <p>International Career</p>
      </div>
    </div>

    <div className="player-competition">
      <h2>International Statistics</h2>

      <div className="player-stats">
        <div>
          <h3>
            {nationalStats.some(item => item.games?.appearances != null)
              ? nationalStats.reduce(
                  (total, item) => total + (item.games?.appearances || 0), 0
                )
              : "N/A"}
          </h3>
          <p>Appearances</p>
        </div>

        <div>
          <h3>
            {nationalStats.reduce(
              (total, item) => total + (item.goals?.total || 0), 0
            )}
          </h3>
          <p>Goals</p>
        </div>

        <div>
          <h3>
            {nationalStats.reduce(
              (total, item) => total + (item.goals?.assists || 0), 0
            )}
          </h3>
          <p>Assists</p>
        </div>
      </div>
    </div>
  </>
) : (
  <p>No national team statistics available for this season.</p>
)}
      <h2>Career History</h2>

{teamsLoading && <p>Loading career history...</p>}

{!teamsLoading && teams.length === 0 && (
  <p>No career history available.</p>
)}

<div className="career-teams">
  {teams.map((item) => (
    <div className="career-team-card" key={item.team.id}>
      <img src={item.team.logo} alt={item.team.name} />
      <h3>{item.team.name}</h3>

      <p>
        {item.seasons?.length
          ? item.seasons.join(", ")
          : "Seasons unavailable"}
      </p>
    </div>
  ))}
</div>
    </div>
  );
}

export default FootballPlayerDetailsPage;