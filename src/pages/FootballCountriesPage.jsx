
import React, { useEffect, useState } from "react";
import { getFootballCountries } from "../services/footballService";
import "../styles/Football.css";

function FootballCountriesPage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getFootballCountries();

        if (active) {
          setCountries(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load football countries.");
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
  }, []);

  const filteredCountries = countries.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="football-library-page">
      <div className="football-page-container">
        <div className="football-breadcrumb">
          <span>Sports</span>
          <span>/</span>
          <span>Football</span>
          <span>/</span>
          <strong>Countries</strong>
        </div>

        <section className="football-page-hero">
          <div className="football-page-hero-content">
            <span className="football-eyebrow">THE WORLD GAME</span>
            <h1>Explore Football Nations</h1>
            <p>
              Discover football teams from around the world.
              Choose a country to explore its national teams.
            </p>
          </div>

          <div className="football-hero-decoration" aria-hidden="true">
            ⚽
          </div>
        </section>

        <section className="football-directory-section">
          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">GLOBAL FOOTBALL</span>
              <h2>Countries</h2>
              <p>Choose a nation to explore its football teams.</p>
            </div>

            <span className="football-result-count">
              {loading ? "Loading..." : `${filteredCountries.length} countries`}
            </span>
          </div>

          <div className="football-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && (
            <div className="football-state">
              <div className="football-loader" />
              <h3>Loading countries</h3>
              <p>Finding football nations...</p>
            </div>
          )}

          {!loading && error && (
            <div className="football-state football-error">
              <h3>Unable to load countries</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filteredCountries.length === 0 && (
            <div className="football-state">
              <h3>No countries found</h3>
              <p>
                {search
                  ? "Try searching with another country name or code."
                  : "There are no countries available right now."}
              </p>
            </div>
          )}

          {!loading && !error && filteredCountries.length > 0 && (
            <div className="football-countries-grid">
              {filteredCountries.map((item, index) => (
                <button
                  className="football-country-card"
                  key={item.code || item.name || index}
                  type="button"
                  onClick={() => {
                    window.location.href = `/football/teams/${encodeURIComponent(item.name)}`;
                  }}
                >
                  <div className="football-country-flag">
                    {item.flag ? (
                      <img src={item.flag} alt={`${item.name} flag`} />
                    ) : (
                      <span>⚽</span>
                    )}
                  </div>

                  <div className="football-country-info">
                    <h3>{item.name}</h3>
                    <p>{item.code || "International"}</p>
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

export default FootballCountriesPage;
