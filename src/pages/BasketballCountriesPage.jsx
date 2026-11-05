
import React, { useEffect, useState } from "react";
import { getBasketballCountries } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballCountriesPage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getBasketballCountries();

        const filtered = data.filter(
          (item) => item.code?.trim() && item.flag?.trim()
        );

        setCountries(filtered);
      } catch (err) {
        setError(err.message || "Unable to load basketball countries.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredCountries = countries.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="basketball-library-page">
      <div className="basketball-page-container">
        <div className="basketball-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Basketball</span>
          <span>/</span>
          <strong>Countries</strong>
        </div>

        <section className="basketball-page-hero">
          <div className="basketball-hero-content">
            <span className="basketball-eyebrow">
              THE WORLD OF BASKETBALL
            </span>

            <h1>Explore Basketball Countries</h1>

            <p>
              Discover basketball teams from around the world.
              Choose a country to explore its teams and basketball
              community.
            </p>
          </div>

          <div className="basketball-hero-decoration" aria-hidden="true">
            <span>🏀</span>
          </div>
        </section>

        <section className="basketball-directory-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">GLOBAL DIRECTORY</span>
              <h2>Browse Countries</h2>
              <p>Find your country and discover its basketball teams.</p>
            </div>

            {!loading && !error && (
              <span className="basketball-result-count">
                {filteredCountries.length} countries
              </span>
            )}
          </div>

          <div className="basketball-search-wrapper">
            <span className="basketball-search-icon">⌕</span>
            <input
              type="text"
              className="basketball-country-search"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="basketball-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {loading ? (
            <div className="basketball-state">
              <div className="basketball-loader"></div>
              <h3>Loading countries</h3>
              <p>Getting basketball countries ready for you...</p>
            </div>
          ) : error ? (
            <div className="basketball-state basketball-error">
              <span>!</span>
              <h3>Unable to load countries</h3>
              <p>{error}</p>
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className="basketball-state">
              <span>⌕</span>
              <h3>No countries found</h3>
              <p>
                {countries.length === 0
                  ? "No basketball countries are currently available."
                  : "Try searching with a different country name or code."}
              </p>
            </div>
          ) : (
            <div className="basketball-countries-grid">
              {filteredCountries.map((item) => (
                <button
                  className="basketball-country-card"
                  key={item.id}
                  onClick={() => {
                    window.location.href = `/basketball/teams/${encodeURIComponent(item.name)}`;
                  }}
                >
                  <div className="basketball-country-flag">
                    <img src={item.flag} alt={`${item.name} flag`} />
                  </div>

                  <div className="basketball-country-info">
                    <h3>{item.name}</h3>
                    <span>{item.code}</span>
                  </div>

                  <span className="basketball-country-arrow">↗</span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default BasketballCountriesPage;
