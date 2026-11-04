import React, { useEffect, useState } from "react";
import { getBasketballLeagues } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballLeagueDetailsPage() {
  const leagueId = window.location.pathname.split("/")[3];

  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getBasketballLeagues({ id: leagueId });

        if (data.length > 0) {
          setLeague(data[0]);
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
    <div className="basketball-league-details">
      <button onClick={() => window.history.back()}>
        ← Back to Leagues
      </button>

      <div className="league-details-header">
        <img src={league.logo} alt={league.name} />

        <div>
          <h1>{league.name}</h1>
          <p>{league.country?.name || "International"}</p>
          <p>{league.type}</p>
        </div>
      </div>

      <h2>Available Seasons</h2>

      <div className="league-seasons-grid">
        {league.seasons?.map((item) => (
          <div className="league-season-card" key={item.season}>
            <h3
                onClick={() => {
                    if (
  item.coverage?.standings &&
  [2022, 2023, 2024].includes(Number(item.season))
) {
                    window.location.href =
                        `/basketball/standings/${leagueId}/${item.season}`;
                    }
                }}
                style={{
                    cursor: item.coverage?.standings ? "pointer" : "default",
                    color: item.coverage?.standings ? "#2563eb" : "inherit",
                }}
                >
                {item.season}
            </h3>

            <p>
              Start: {item.start || "Not available"}
            </p>

            <p>
              End: {item.end || "Not available"}
            </p>

            <h4>Available Coverage</h4>

            <p>
              Standings: {item.coverage?.standings ? "Available" : "Not available"}
            </p>

            <p>
              Player statistics: {
                item.coverage?.players ? "Available" : "Not available"
              }
            </p>

            <p>
              Team statistics: {
                item.coverage?.games?.statistics?.teams
                  ? "Available"
                  : "Not available"
              }
            </p>
          </div>
        ))}
      </div>

      {(!league.seasons || league.seasons.length === 0) && (
        <p>No seasons available for this league.</p>
      )}
    </div>
  );
}

export default BasketballLeagueDetailsPage;