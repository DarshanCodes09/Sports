
import React, { useEffect, useState } from "react";
import { getBasketballTeams } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballTeamsPage() {
  const country = decodeURIComponent(
    window.location.pathname.split("/")[3] || ""
  );

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBasketballTeams({ country });
        setTeams(data);
      } catch (err) {
        setError(err.message || "Unable to load basketball teams.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [country]);

  const filteredTeams = teams.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const teamsPerPage = 30;
  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);
  const start = (page - 1) * teamsPerPage;
  const currentTeams = filteredTeams.slice(start, start + teamsPerPage);

  return (
    <main className="basketball-library-page">
      <div className="basketball-page-container">
        <div className="basketball-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Basketball</span>
          <span>/</span>
          <span>Countries</span>
          <span>/</span>
          <strong>{country}</strong>
        </div>

        <section className="basketball-page-hero basketball-team-hero">
          <div className="basketball-hero-content">
            <span className="basketball-eyebrow">
              BASKETBALL DIRECTORY
            </span>

            <h1>{country} Basketball Teams</h1>

            <p>
              Explore basketball teams representing {country}.
              Find your team and discover its profile and details.
            </p>
          </div>

          <div className="basketball-hero-decoration" aria-hidden="true">
            <span>🏀</span>
          </div>
        </section>

        <section className="basketball-directory-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">TEAM DIRECTORY</span>
              <h2>Find Your Team</h2>
              <p>Search through the available basketball teams.</p>
            </div>

            {!loading && !error && (
              <span className="basketball-result-count">
                {filteredTeams.length} teams
              </span>
            )}
          </div>

          <div className="basketball-search-wrapper">
            <span className="basketball-search-icon">⌕</span>

            <input
              type="text"
              className="basketball-country-search"
              placeholder="Search team name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            {search && (
              <button
                className="basketball-clear-search"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {loading ? (
            <div className="basketball-state">
              <div className="basketball-loader"></div>
              <h3>Loading teams</h3>
              <p>Finding basketball teams from {country}...</p>
            </div>
          ) : error ? (
            <div className="basketball-state basketball-error">
              <span>!</span>
              <h3>Unable to load teams</h3>
              <p>{error}</p>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="basketball-state">
              <span>⌕</span>
              <h3>No teams found</h3>
              <p>
                {teams.length === 0
                  ? `No basketball teams are currently available for ${country}.`
                  : "Try searching with another team name."}
              </p>
            </div>
          ) : (
            <>
              <div className="basketball-team-directory-grid">
                {currentTeams.map((item) => (
                  <button
                    className="basketball-team-directory-card"
                    key={item.id}
                    onClick={() => {
                      window.location.href = `/basketball/team/${item.id}`;
                    }}
                  >
                    <div className="basketball-team-logo">
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        loading="lazy"
                      />
                    </div>

                    <div className="basketball-team-info">
                      <h3>{item.name}</h3>
                      <p>{item.country?.name || country}</p>
                    </div>

                    <span className="basketball-team-arrow">↗</span>
                  </button>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="basketball-pagination">
                  <button
                    onClick={() => setPage((current) => current - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((current) => current + 1)}
                    disabled={page === totalPages}
                  >
                    Next
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

export default BasketballTeamsPage;
