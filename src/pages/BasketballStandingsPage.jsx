
import React, { useEffect, useState } from "react";
import { getBasketballStandings } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballStandingsPage() {
  const parts = window.location.pathname.split("/");
  const leagueId = parts[3];
  const season = parts[4];

  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getBasketballStandings({
          league: leagueId,
          season: season,
        });

        if (data.length === 0) {
          setApiMessage(
            "Standings are unavailable for this season on your current API plan."
          );
        } else {
          setStandings(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [leagueId, season]);

  if (loading) return <h2>Loading standings...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="basketball-standings">
      <button onClick={() => window.history.back()}>
        ← Back
      </button>

      <h1>League Standings</h1>
      <h3>Season: {season}</h3>

      {standings.length === 0 && (
        <p>
          {apiMessage || "No standings available for this league and season."}
        </p>
      )}

      {standings.map((group, index) => {
        const teams = Array.isArray(group) ? group : [group];

        return (
          <div className="standings-group" key={index}>
            <div className="standings-table">
              {teams.map((team, teamIndex) => (
                <div
                  className="standings-row"
                  key={team.team?.id || teamIndex}
                >
                  <span>{team.position || teamIndex + 1}</span>

                  {team.team?.logo && (
                    <img src={team.team.logo} alt={team.team.name} />
                  )}

                  <strong>{team.team?.name || "Unknown team"}</strong>
                  <span>Played: {team.games?.played ?? "-"}</span>
                  <span>Won: {team.games?.win?.total ?? "-"}</span>
                  <span>Lost: {team.games?.lose?.total ?? "-"}</span>
                  <span>Points: {team.points ?? "-"}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BasketballStandingsPage;
