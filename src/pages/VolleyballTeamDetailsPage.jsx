import React, { useEffect, useState } from "react";
import {
  getVolleyballTeams,
  getVolleyballGames,
} from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballTeamDetailsPage() {
  const teamId = window.location.pathname.split("/")[3];

  const [team, setTeam] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const season = 2024;

  useEffect(() => {
    const getData = async () => {
      try {
            const teamData = await getVolleyballTeams({
            id: teamId,
            });

            console.log("Team API response:", teamData);

            if (Array.isArray(teamData) && teamData.length > 0) {
            setTeam(teamData[0]);
            } else {
            setError("Team not found.");
            return;
        }

        const gameData = await getVolleyballGames({
          team: teamId,
          season: season,
        });

        setGames(gameData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [teamId]);

  if (loading) return <h2>Loading team details...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!team) return <h2>Team not found.</h2>;

  return (
    <div className="volleyball-team-details">
      <button onClick={() => window.history.back()}>
        ← Back to Teams
      </button>

      <div className="volleyball-team-header">
        {team.logo && (
          <img src={team.logo} alt={team.name} />
        )}

        <div>
          <h1>{team.name}</h1>

          <p>
            Country: {team.country?.name || "Not available"}
          </p>

          <p>
            Team Type: {team.national ? "National Team" : "Club Team"}
          </p>

          <p>Team ID: {team.id}</p>
        </div>
      </div>

      <h2>Match History - {season}</h2>

      <p>{games.length} matches found</p>

      <div className="volleyball-games-list">
        {games.map((game) => (
          <div className="volleyball-game-card" key={game.id}>
            <div className="volleyball-game-info">
              <strong>{game.league?.name}</strong>
              <span>{game.league?.season}</span>
            </div>

            <p>
              {game.date
                ? new Date(game.date).toLocaleDateString()
                : "Date unavailable"}
            </p>

            <div className="volleyball-game-teams">
              <div className="volleyball-game-team">
                {game.teams?.home?.logo && (
                  <img
                    src={game.teams.home.logo}
                    alt={game.teams.home.name}
                  />
                )}

                <strong>{game.teams?.home?.name}</strong>
              </div>

              <div className="volleyball-game-score">
                <h2>
                  {game.scores?.home ?? "-"} :{" "}
                  {game.scores?.away ?? "-"}
                </h2>
              </div>

              <div className="volleyball-game-team">
                {game.teams?.away?.logo && (
                  <img
                    src={game.teams.away.logo}
                    alt={game.teams.away.name}
                  />
                )}

                <strong>{game.teams?.away?.name}</strong>
              </div>
            </div>

            <p className="volleyball-game-status">
              {game.status?.long || "Unknown status"}
            </p>

            <div className="volleyball-game-periods">
              {["first", "second", "third", "fourth", "fifth"].map(
                (period, index) => {
                  const score = game.periods?.[period];

                  if (
                    score?.home == null ||
                    score?.away == null
                  ) {
                    return null;
                  }

                  return (
                    <span key={period}>
                      Set {index + 1}: {score.home} - {score.away}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>

      {games.length === 0 && (
        <p>No matches available for this team and season.</p>
      )}
    </div>
  );
}

export default VolleyballTeamDetailsPage;