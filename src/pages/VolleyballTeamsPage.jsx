import React, { useEffect, useState } from "react";
import { getVolleyballTeams } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballTeamsPage() {
  const country = decodeURIComponent(
    window.location.pathname.split("/")[3]
  );

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const teamsPerPage = 30;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getVolleyballTeams({
          country: country,
        });

        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [country]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);

  const startIndex = (currentPage - 1) * teamsPerPage;

  const displayedTeams = filteredTeams.slice(
    startIndex,
    startIndex + teamsPerPage
  );

  if (loading) return <h2>Loading volleyball teams...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="volleyball-teams-page">
      <button onClick={() => window.history.back()}>
        ← Back to Countries
      </button>

      <h1>{country} Volleyball Teams</h1>

      <input
        type="text"
        placeholder="Search teams..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <p>{filteredTeams.length} teams found</p>

      <div className="volleyball-teams-grid">
        {displayedTeams.map((team) => (
          <div
            className="volleyball-team-card"
            key={team.id}
            onClick={() => {
              window.location.href = `/volleyball/team/${team.id}`;
            }}
            style={{ cursor: "pointer" }}
          >
            {team.logo && (
              <img src={team.logo} alt={team.name} />
            )}

            <h3>{team.name}</h3>

            <p>
              {team.national ? "National Team" : "Club Team"}
            </p>

            <small>{team.country?.name || country}</small>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <p>No teams found.</p>
      )}

      {totalPages > 1 && (
        <div className="volleyball-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default VolleyballTeamsPage;