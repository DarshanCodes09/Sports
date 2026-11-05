
import React, { useEffect, useState } from "react";
import { getBasketballTeams } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballTeamsPage() {
  const country = decodeURIComponent(window.location.pathname.split("/")[3]);

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getBasketballTeams({ country });
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
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const teamsPerPage = 30;
  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);
  const start = (page - 1) * teamsPerPage;
  const currentTeams = filteredTeams.slice(start, start + teamsPerPage);

  if (loading) return <h2>Loading teams...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="basketball-teams">
      <h1>{country} Basketball Teams</h1>

      <input
        type="text"
        className="team-search"
        placeholder="Search team name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <p>Showing {filteredTeams.length} teams</p>

      <div className="teams-grid">
        {currentTeams.map((item) => (
          <div
            className="team-card"
            key={item.id}
            onClick={() => {
              window.location.href = `/basketball/team/${item.id}`;
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={item.logo} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.country?.name || country}</p>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && <p>No teams found.</p>}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>Page {page} of {totalPages}</span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BasketballTeamsPage;
