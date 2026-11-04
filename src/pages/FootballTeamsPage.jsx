import React, { useEffect, useState } from "react";
import { getFootballTeams } from "../services/footballService";
import "../styles/Football.css";

function FootballTeamsPage() {
  const country = decodeURIComponent(window.location.pathname.split("/")[3]);

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getFootballTeams({ country });
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [country]);

  const filteredTeams = teams.filter((item) =>
    item.team.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading teams...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="football-teams">
      <h1>{country} Football Teams</h1>

      <input
        type="text"
        className="team-search"
        placeholder="Search team name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p className="team-count">
        Showing {filteredTeams.length} teams
      </p>

      <div className="teams-grid">
        {filteredTeams.map((item) => (
          <div
            className="team-card"
            key={item.team.id}
            onClick={() => {
              window.location.href = `/football/team/${item.team.id}`;
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={item.team.logo} alt={item.team.name} />
            <h3>{item.team.name}</h3>
            <p>{item.team.code || country}</p>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && <p>No teams found.</p>}
    </div>
  );
}

export default FootballTeamsPage;