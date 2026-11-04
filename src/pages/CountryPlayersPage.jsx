import React, { useEffect, useState } from "react";
import { getPlayersByTeam } from "../services/cricketService";
import "../styles/CricketLists.css";

export default function CountryPlayersPage() {
  const countryId = window.location.pathname.split("/")[2];

  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPlayers(pageNumber) {
    try {
      setLoading(true);
      setError("");

      const result = await getPlayersByTeam(countryId, pageNumber);

      setPlayers(result.players);
      setMeta(result.meta);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlayers(1);
  }, [countryId]);

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>Error: {error}</p>;
    return (
    <main>
        <h1>{countryId.replaceAll("-", " ")} Players</h1>

        <p>
        Page {meta.page || page} of {meta.total_pages || 1}
        </p>

        <div className="player-list">
        {players.map((player) => (
            <button
            className="player-item"
            key={player.player}
            onClick={() =>
                (window.location.href = `/players/${player.player}`)
            }
            >
            {player.name}
            <span>{player.matches} matches</span>
            </button>
        ))}
        </div>

        <div>
        <button
            disabled={!meta.prev_page}
            onClick={() => loadPlayers(meta.prev_page)}
        >
            Previous
        </button>

        <button
            disabled={!meta.next_page}
            onClick={() => loadPlayers(meta.next_page)}
        >
            Next
        </button>
        </div>
    </main>
    );


}