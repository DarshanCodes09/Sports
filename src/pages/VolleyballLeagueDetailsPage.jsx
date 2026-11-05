import React, { useEffect, useState } from "react";
import { getVolleyballLeagues } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballLeagueDetailsPage() {
  const leagueId = window.location.pathname.split("/")[3];

  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getVolleyballLeagues({ id: leagueId });
        const selectedLeague = data[0];

        if (selectedLeague) {
          setLeague(selectedLeague);
        } else {
          setError("League not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [leagueId]);

  if (loading) return <h2>Loading league details...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!league) return <h2>League not found.</h2>;

  return (
    <div className="volleyball-league-details">
      <button onClick={() => window.history.back()}>
        ← Back to Leagues
      </button>

      <div className="volleyball-league-header">
        {league.logo && (
          <img src={league.logo} alt={league.name} />
        )}

        <div>
          <h1>{league.name}</h1>
          <p>{league.country?.name || "International"}</p>
          <p>{league.type}</p>
        </div>
      </div>

      <h2>Available Seasons</h2>

      <div className="volleyball-seasons-grid">
        {league.seasons?.map((item) => (
          <div
            className="volleyball-season-card"
            key={item.season}
          >
            <h3>{item.season}</h3>

            <p>Start: {item.start || "Not available"}</p>
            <p>End: {item.end || "Not available"}</p>

            {item.current && <strong>Current Season</strong>}

            <button
              onClick={() => {
                window.location.href =
                  `/volleyball/standings/${leagueId}/${item.season}`;
              }}
            >
              View Standings
            </button>
          </div>
        ))}
      </div>

      {(!league.seasons || league.seasons.length === 0) && (
        <p>No seasons available for this competition.</p>
      )}
    </div>
  );
}

export default VolleyballLeagueDetailsPage;