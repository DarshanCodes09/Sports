import React, { useEffect, useState } from "react";
import { getBasketballPlayerStatistics } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballPlayerDetailsPage() {
  const params = new URLSearchParams(window.location.search);

  const playerId = window.location.pathname.split("/").pop();
  const name = params.get("name") || "Basketball Player";
  const number = params.get("number") || "N/A";
  const position = params.get("position") || "N/A";
  const country = params.get("country") || "N/A";
  const age = params.get("age") || "N/A";
  const team = params.get("team") || "N/A";
  const season = params.get("season") || "2023";

  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const data = await getBasketballPlayerStatistics({
          player: playerId,
          season: season,
        });

        setStatistics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, [playerId, season]);

  const formatLabel = (value) => {
    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const showValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    if (typeof value === "object") {
      return (
        <div className="player-stat-group">
          {Object.entries(value).map(([key, item]) => (
            <p key={key}>
              <strong>{formatLabel(key)}:</strong> {showValue(item)}
            </p>
          ))}
        </div>
      );
    }

    return String(value);
  };

  return (
    <div className="basketball-players">
      <button onClick={() => window.history.back()}>
        Back to Players
      </button>

      <h1>{name}</h1>

      <div className="player-card">
        <h2>Player Information</h2>
        <p>Team: {team}</p>
        <p>Jersey Number: {number}</p>
        <p>Position: {position}</p>
        <p>Country: {country}</p>
        <p>Age: {age}</p>
        <p>Season: {season}</p>
      </div>

      <h2>Player Statistics</h2>

      {loading && <p>Loading player statistics...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && statistics.length === 0 && (
        <p>No statistics available for this player and season.</p>
      )}

      {!loading && statistics.map((item, index) => (
        <div className="player-card" key={index}>
          {Object.entries(item).map(([key, value]) => (
            <div key={key}>
              <h3>{formatLabel(key)}</h3>
              {showValue(value)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BasketballPlayerDetailsPage;