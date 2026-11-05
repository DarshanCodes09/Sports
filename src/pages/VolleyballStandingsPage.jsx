import React, { useEffect, useState } from "react";
import { getVolleyballStandings } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballStandingsPage() {
  const parts = window.location.pathname.split("/");
  const leagueId = parts[3];
  const season = parts[4];

  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getVolleyballStandings({
          league: leagueId,
          season: season,
        });

        setStandings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [leagueId, season]);

  if (loading) return <h2>Loading volleyball standings...</h2>;
  if (error) return <h2>{error}</h2>;

  // API returns standings inside nested arrays
  const allTeams = standings.flat(Infinity);

  // Separate teams according to their group
  const groups = {};

  allTeams.forEach((item) => {
    const groupName = item.group?.name || "Overall Standings";

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push(item);
  });

  return (
    <div className="volleyball-standings-page">
      <button onClick={() => window.history.back()}>
        ← Back to League
      </button>

      <h1>Volleyball Standings</h1>
      <h3>Season: {season}</h3>

      {Object.keys(groups).length === 0 && (
        <p>No standings available for this league and season.</p>
      )}

      {Object.entries(groups).map(([groupName, teams]) => (
        <div className="volleyball-standings-group" key={groupName}>
          <h2>{groupName}</h2>

          <div className="volleyball-standings-table">
            <div className="volleyball-standings-row volleyball-standings-header">
              <span>Pos</span>
              <span>Team</span>
              <span>Played</span>
              <span>Won</span>
              <span>Lost</span>
              <span>Sets For</span>
              <span>Sets Against</span>
              <span>Points</span>
            </div>

            {teams.map((item, index) => (
              <div
                className="volleyball-standings-row"
                key={item.team?.id || index}
              >
                <span>{item.position || index + 1}</span>

                <div className="volleyball-standings-team">
                  {item.team?.logo && (
                    <img
                      src={item.team.logo}
                      alt={item.team.name}
                    />
                  )}

                  <strong>{item.team?.name || "Unknown team"}</strong>
                </div>

                <span>{item.games?.played ?? "-"}</span>
                <span>{item.games?.win?.total ?? "-"}</span>
                <span>{item.games?.lose?.total ?? "-"}</span>
                <span>{item.goals?.for ?? "-"}</span>
                <span>{item.goals?.against ?? "-"}</span>
                <strong>{item.points ?? "-"}</strong>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VolleyballStandingsPage;