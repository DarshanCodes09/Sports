import React, { useEffect, useState } from "react";
import { getVolleyballGames } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballGamesPage() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        // Load games from a verified competition and season
        const data = await getVolleyballGames({
          league: 2,
          season: 2024,
        });

        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredGames = games.filter((game) => {
    const home = game.teams?.home?.name?.toLowerCase() || "";
    const away = game.teams?.away?.name?.toLowerCase() || "";
    const league = game.league?.name?.toLowerCase() || "";

    return (
      home.includes(search.toLowerCase()) ||
      away.includes(search.toLowerCase()) ||
      league.includes(search.toLowerCase())
    );
  });

  if (loading) return <h2>Loading volleyball games...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="volleyball-games-page">
      <h1>Volleyball Match Results</h1>

      <input
        type="text"
        placeholder="Search teams or competitions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{filteredGames.length} matches found</p>

      <div className="volleyball-games-list">
        {filteredGames.map((game) => (
          <div className="volleyball-game-card" key={game.id}>
            <div className="volleyball-game-info">
              <strong>{game.league?.name}</strong>
              <span>Season: {game.league?.season}</span>
            </div>

            <div className="volleyball-game-date">
              {game.date
                ? new Date(game.date).toLocaleString()
                : "Date unavailable"}
            </div>

            <div className="volleyball-game-teams">
              <div className="volleyball-game-team">
                {game.teams?.home?.logo && (
                  <img
                    src={game.teams.home.logo}
                    alt={game.teams.home.name}
                  />
                )}

                <strong>
                  {game.teams?.home?.name || "Home Team"}
                </strong>
              </div>

              <div className="volleyball-game-score">
                <h2>
                  {game.scores?.home ?? "-"} : {game.scores?.away ?? "-"}
                </h2>
              </div>

              <div className="volleyball-game-team">
                {game.teams?.away?.logo && (
                  <img
                    src={game.teams.away.logo}
                    alt={game.teams.away.name}
                  />
                )}

                <strong>
                  {game.teams?.away?.name || "Away Team"}
                </strong>
              </div>
            </div>

            <div className="volleyball-game-status">
              {game.status?.long || game.status?.short || "Unknown status"}
            </div>

            <div className="volleyball-game-periods">
              {["first", "second", "third", "fourth", "fifth"].map(
                (period) => {
                  const score = game.periods?.[period];

                  if (!score) return null;

                  return (
                    <span key={period}>
                      Set {period}: {score.home} - {score.away}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <p>No volleyball matches found.</p>
      )}
    </div>
  );
}

export default VolleyballGamesPage;