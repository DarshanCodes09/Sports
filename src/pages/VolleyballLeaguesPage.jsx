import React, { useEffect, useState } from "react";
import { getVolleyballLeagues } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballLeaguesPage() {
  const [leagues, setLeagues] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getVolleyballLeagues();
        setLeagues(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load volleyball competitions.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredLeagues = leagues.filter((league) => {
    const query = search.trim().toLowerCase();
    const leagueName = league.name?.toLowerCase() || "";
    const countryName = league.country?.name?.toLowerCase() || "";

    return leagueName.includes(query) || countryName.includes(query);
  });

  return (
    <main className="volleyball-library-page">
      <div className="volleyball-page-container">
        <div className="volleyball-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/volleyball/countries">Volleyball</a>
          <span>/</span>
          <strong>Leagues</strong>
        </div>

        <section className="volleyball-page-hero">
          <div className="volleyball-hero-content">
            <span className="volleyball-eyebrow">
              THE COMPETITION DIRECTORY
            </span>

            <h1>Volleyball Leagues & Competitions</h1>

            <p>
              Explore volleyball competitions from around the world.
              Discover leagues, tournaments and international events.
            </p>
          </div>

          <div className="volleyball-hero-icon" aria-hidden="true">
            🏆
          </div>
        </section>

        <section className="volleyball-directory-section">
          <div className="volleyball-section-heading">
            <div>
              <span className="volleyball-eyebrow">
                COMPETITION HUB
              </span>

              <h2>Explore Competitions</h2>

              <p>
                Find leagues by competition name or country.
              </p>
            </div>

            <span className="volleyball-count">
              {filteredLeagues.length} competitions
            </span>
          </div>

          <div className="volleyball-search-wrapper">
            <span className="volleyball-search-icon">⌕</span>

            <input
              type="text"
              className="volleyball-country-search"
              placeholder="Search leagues or countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="volleyball-state">
              <div className="volleyball-loader" />
              <h3>Loading competitions</h3>
              <p>Gathering volleyball leagues and tournaments...</p>
            </div>
          ) : error ? (
            <div className="volleyball-state volleyball-error-state">
              <h3>Unable to load competitions</h3>
              <p>{error}</p>
            </div>
          ) : filteredLeagues.length === 0 ? (
            <div className="volleyball-state">
              <span className="volleyball-empty-icon">⌕</span>
              <h3>No competitions found</h3>
              <p>
                {search
                  ? "Try another league or country name."
                  : "No volleyball competitions are currently available."}
              </p>
            </div>
          ) : (
            <div className="volleyball-leagues-grid">
              {filteredLeagues.map((league) => (
                <button
                  type="button"
                  className="volleyball-league-card"
                  key={league.id}
                  onClick={() => {
                    window.location.href = `/volleyball/league/${league.id}`;
                  }}
                >
                  <div className="volleyball-league-logo-wrapper">
                    {league.logo ? (
                      <img
                        src={league.logo}
                        alt={`${league.name} logo`}
                        className="volleyball-league-logo"
                        loading="lazy"
                      />
                    ) : (
                      <span className="volleyball-league-placeholder">
                        🏆
                      </span>
                    )}
                  </div>

                  <div className="volleyball-league-info">
                    <h3>{league.name}</h3>

                    <p className="volleyball-league-country">
                      {league.country?.flag && (
                        <img
                          src={league.country.flag}
                          alt=""
                          className="volleyball-league-country-flag"
                          loading="lazy"
                        />
                      )}

                      {league.country?.name || "International"}
                    </p>

                    <span className="volleyball-league-type">
                      {league.type || "Competition"}
                    </span>
                  </div>

                  <span className="volleyball-league-arrow">↗</span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default VolleyballLeaguesPage;