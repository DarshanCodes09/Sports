import React, { useEffect, useState } from "react";
import { getCompetitions } from "../services/cricketService";

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLeagues() {
      try {
        const data = await getCompetitions();
        setLeagues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeagues();
  }, []);

  if (loading) return <p>Loading leagues...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1>Cricket Leagues</h1>

      <div className="country-list">
        {leagues.map((league) => (
          <button
            className="country-item"
            key={league.competition}
            onClick={() =>
              (window.location.href = `/leagues/${league.competition}`)
            }
          >
            {league.name}
            <span>{league.type || "Competition"}</span>
          </button>
        ))}
      </div>
    </main>
  );
}