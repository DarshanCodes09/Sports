
import React, { useEffect, useState } from "react";
import { getFootballTeams } from "../services/footballService";
import "../styles/Football.css";

function FootballTeamsPage() {
  const country = decodeURIComponent(
    window.location.pathname.split("/")[3]
  );

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getFootballTeams({ country });

        if (active) {
          setTeams(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load football teams.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      active = false;
    };
  }, [country]);

  const filteredTeams = teams.filter((item) =>
    item.team?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="football-library-page">
      <div className="football-page-container">

        <div className="football-breadcrumb">
          <span>Sports</span>
          <span>/</span>
          <span>Football</span>
          <span>/</span>
          <strong>{country}</strong>
        </div>

        <section className="football-page-hero">
          <div className="football-page-hero-content">
            <span className="football-eyebrow">NATIONAL FOOTBALL DIRECTORY</span>
            <h1>{country} Football Teams</h1>
            <p>
              Explore the football clubs and teams listed for {country}.
              Select a team to discover more about its profile and performance.
            </p>
          </div>

          <div className="football-hero-decoration" aria-hidden="true">
            ⚽
          </div>
        </section>

        <section className="football-directory-section">
          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">TEAM DIRECTORY</span>
              <h2>Explore Teams</h2>
              <p>Find a team and explore its football information.</p>
            </div>

            <span className="football-result-count">
              {loading ? "Loading..." : `${filteredTeams.length} teams`}
            </span>
          </div>

          <div className="football-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="text"
              placeholder="Search team name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && (
            <div className="football-state">
              <div className="football-loader" />
              <h3>Loading teams</h3>
              <p>Finding teams from {country}...</p>
            </div>
          )}

          {!loading && error && (
            <div className="football-state football-error">
              <h3>Unable to load teams</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filteredTeams.length === 0 && (
            <div className="football-state">
              <h3>No teams found</h3>
              <p>
                {search
                  ? "Try searching with another team name."
                  : `No teams are currently available for ${country}.`}
              </p>
            </div>
          )}

          {!loading && !error && filteredTeams.length > 0 && (
            <div className="football-team-directory-grid">
              {filteredTeams.map((item, index) => (
                <button
                  className="football-team-directory-card"
                  type="button"
                  key={item.team?.id || index}
                  onClick={() => {
                    window.location.href = `/football/team/${item.team.id}`;
                  }}
                >
                  <div className="football-team-logo">
                    {item.team?.logo ? (
                      <img
                        src={item.team.logo}
                        alt={`${item.team.name} logo`}
                      />
                    ) : (
                      <span>⚽</span>
                    )}
                  </div>

                  <div className="football-team-directory-info">
                    <h3>{item.team?.name || "Unknown team"}</h3>
                    <p>{item.team?.code || country}</p>
                  </div>

                  <span className="football-country-arrow">↗</span>
                </button>
              ))}
            </div>
          )}

        </section>
      </div>
    </main>
  );
}

export default FootballTeamsPage;
