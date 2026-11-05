import React, { useEffect, useState } from "react";
import { getVolleyballTeams } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballTeamsPage() {
  const country = decodeURIComponent(
    window.location.pathname.split("/")[3] || ""
  );

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const teamsPerPage = 30;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getVolleyballTeams({ country });
        setTeams(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load volleyball teams.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [country]);

  const filteredTeams = teams.filter((team) =>
    (team.name || "").toLowerCase().includes(search.trim().toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);
  const startIndex = (currentPage - 1) * teamsPerPage;

  const displayedTeams = filteredTeams.slice(
    startIndex,
    startIndex + teamsPerPage
  );

  return (
    <main className="volleyball-library-page">
      <div className="volleyball-page-container">
        <div className="volleyball-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/volleyball/countries">Volleyball</a>
          <span>/</span>
          <strong>{country}</strong>
        </div>

        <section className="volleyball-page-hero">
          <div className="volleyball-hero-content">
            <span className="volleyball-eyebrow">
              VOLLEYBALL DIRECTORY
            </span>

            <h1>{country} Volleyball Teams</h1>

            <p>
              Explore volleyball teams representing {country}.
              Discover national sides and clubs from across the country.
            </p>
          </div>

          <div className="volleyball-hero-icon" aria-hidden="true">
            🏐
          </div>
        </section>

        <section className="volleyball-directory-section">
          <button
            type="button"
            className="volleyball-back-button"
            onClick={() => {
              window.location.href = "/volleyball/countries";
            }}
          >
            ← Back to Countries
          </button>

          <div className="volleyball-section-heading">
            <div>
              <span className="volleyball-eyebrow">
                TEAM DIRECTORY
              </span>

              <h2>Browse Teams</h2>

              <p>
                Search and explore volleyball teams from {country}.
              </p>
            </div>

            <span className="volleyball-count">
              {filteredTeams.length} teams
            </span>
          </div>

          <div className="volleyball-search-wrapper">
            <span className="volleyball-search-icon">⌕</span>

            <input
              type="text"
              className="volleyball-country-search"
              placeholder="Search teams..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {loading ? (
            <div className="volleyball-state">
              <div className="volleyball-loader" />
              <h3>Loading teams</h3>
              <p>Finding volleyball teams from {country}...</p>
            </div>
          ) : error ? (
            <div className="volleyball-state volleyball-error-state">
              <h3>Unable to load teams</h3>
              <p>{error}</p>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="volleyball-state">
              <span className="volleyball-empty-icon">⌕</span>
              <h3>No teams found</h3>
              <p>
                {search
                  ? "Try searching with a different team name."
                  : `No volleyball teams are currently available for ${country}.`}
              </p>
            </div>
          ) : (
            <>
              <div className="volleyball-teams-grid">
                {displayedTeams.map((team) => (
                  <button
                    type="button"
                    className="volleyball-team-card"
                    key={team.id}
                    onClick={() => {
                      window.location.href = `/volleyball/team/${team.id}`;
                    }}
                  >
                    <div className="volleyball-team-logo-wrapper">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={`${team.name} logo`}
                          className="volleyball-team-logo"
                          loading="lazy"
                        />
                      ) : (
                        <span className="volleyball-team-placeholder">
                          🏐
                        </span>
                      )}
                    </div>

                    <div className="volleyball-team-info">
                      <h3>{team.name}</h3>

                      <span className="volleyball-team-type">
                        {team.national ? "National Team" : "Club Team"}
                      </span>

                      <small>
                        {team.country?.name || country}
                      </small>
                    </div>

                    <span className="volleyball-team-arrow">↗</span>
                  </button>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="volleyball-pagination">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                  >
                    ← Previous
                  </button>

                  <span>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default VolleyballTeamsPage;