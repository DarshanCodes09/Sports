import React, { useEffect, useState } from "react";
import { getPlayerProfile, getPlayerStats } from "../services/cricketService";

export default function PlayerDetailsPage() {
  const playerId = window.location.pathname.split("/")[2];

  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlayer() {
      try {
        setLoading(true);
        setError("");

        const profile = await getPlayerProfile(playerId);
        const playerStats = await getPlayerStats(playerId);

        setPlayer(profile);
        setStats(playerStats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPlayer();
  }, [playerId]);

  if (loading) return <p>Loading player profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!player) return <p>Player not found.</p>;

  return (
    <main>
      <button onClick={() => window.history.back()}>
        Back
      </button>

      <h1>{player.name}</h1>

      <h2>Player Information</h2>

      <p>Country: {player.country || "N/A"}</p>
      <p>Born: {player.born || "N/A"}</p>
      <p>Birthplace: {player.birthplace || "N/A"}</p>
      <p>Batting: {player.batting_style || "N/A"}</p>
      <p>Bowling: {player.bowling_style || "N/A"}</p>
      <p>Total Matches: {player.matches || 0}</p>

      <h2>Teams</h2>

      {player.teams?.length ? (
        player.teams.map((team) => (
          <p key={team.team}>
            {team.name} — {team.matches} matches
          </p>
        ))
      ) : (
        <p>No team information available.</p>
      )}

      <h2>Career Statistics</h2>

      {stats && (
        <>
          <h3>Batting</h3>

          {Object.entries(stats.batting || {}).map(([format, data]) => (
            <div key={format}>
              <h4>{format.toUpperCase()}</h4>
              {Object.entries(data || {}).map(([key, value]) => (
                <p key={key}>
                  {key.replaceAll("_", " ")}: {value ?? "N/A"}
                </p>
              ))}
            </div>
          ))}

          <h3>Bowling</h3>

          {Object.entries(stats.bowling || {}).map(([format, data]) => (
            <div key={format}>
              <h4>{format.toUpperCase()}</h4>
              {Object.entries(data || {}).map(([key, value]) => (
                <p key={key}>
                  {key.replaceAll("_", " ")}: {value ?? "N/A"}
                </p>
              ))}
            </div>
          ))}
        </>
      )}
    </main>
  );
}
