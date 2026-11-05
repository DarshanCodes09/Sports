import React, { useEffect, useState } from "react";
import {
  getFootballTeamDetails,
  getFootballSquad,
} from "../services/footballService";
import "../styles/Football.css";

function FootballTeamDetailsPage() {
  const id = window.location.pathname.split("/")[3];

  const [team, setTeam] = useState(null);
  const [venue, setVenue] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [squadLoading, setSquadLoading] = useState(false);
  const [squadRequested, setSquadRequested] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const teamData = await getFootballTeamDetails(id);

        if (teamData.length === 0) {
          setError("Team not found.");
          return;
        }

        setTeam(teamData[0].team);
        setVenue(teamData[0].venue);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  const loadSquad = async () => {
    try {
      setSquadLoading(true);
      setSquadRequested(true);
      setError("");

      const squadData = await getFootballSquad(id);
      setPlayers(squadData[0]?.players || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setSquadLoading(false);
    }
  };

  if (loading) return <h2>Loading team profile...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!team) return <h2>Team not found.</h2>;

  return (
    <div className="football-team-details">
      <button onClick={() => window.history.back()}>
        Back to Teams
      </button>

      <div className="team-profile">
        <img src={team.logo} alt={team.name} />

        <div>
          <h1>{team.name}</h1>
          <p>Country: {team.country || "N/A"}</p>
          <p>Founded: {team.founded || "N/A"}</p>
          <p>National Team: {team.national ? "Yes" : "No"}</p>
        </div>
      </div>

      <h2>Stadium Information</h2>

      <div className="team-venue">
        <img src={venue?.image} alt={venue?.name || "Stadium"} />

        <div>
          <h3>{venue?.name || "N/A"}</h3>
          <p>City: {venue?.city || "N/A"}</p>
          <p>Capacity: {venue?.capacity || "N/A"}</p>
          <p>Address: {venue?.address || "N/A"}</p>
          <p>Surface: {venue?.surface || "N/A"}</p>
        </div>
      </div>

      <h2>Team Squad ({players.length})</h2>

      <button onClick={loadSquad} disabled={squadLoading}>
        {squadLoading ? "Loading squad..." : "Load squad"}
      </button>

      {squadRequested && players.length === 0 && (
        <p>No squad information available.</p>
      )}

      <div className="squad-grid">
        {players.map((item) => (
          <div className="squad-card" key={item.id}>
            <img src={item.photo} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.position || "N/A"}</p>
            <p>Age: {item.age || "N/A"}</p>
            <p>Number: {item.number || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FootballTeamDetailsPage;