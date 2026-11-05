import React, { useEffect, useState } from "react";
import { getVolleyballCountries } from "../services/volleyballService";
import "../styles/Volleyball.css";

function VolleyballCountriesPage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getVolleyballCountries();

        const filtered = (Array.isArray(data) ? data : []).filter(
          (country) =>
            country.code?.trim() &&
            country.flag?.trim() &&
            country.name?.trim()
        );

        setCountries(filtered);
      } catch (err) {
        setError(err.message || "Unable to load volleyball countries.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main className="volleyball-library-page">
      <div className="volleyball-page-container">
        <div className="volleyball-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Volleyball</span>
          <span>/</span>
          <strong>Countries</strong>
        </div>

        <section className="volleyball-page-hero">
          <div className="volleyball-hero-content">
            <span className="volleyball-eyebrow">
              THE WORLD OF VOLLEYBALL
            </span>

            <h1>Explore Volleyball Nations</h1>

            <p>
              Discover volleyball teams from around the world. Choose a
              country to explore its teams and volleyball community.
            </p>
          </div>

          <div className="volleyball-hero-icon" aria-hidden="true">
            🏐
          </div>
        </section>

        <section className="volleyball-directory-section">
          <div className="volleyball-section-heading">
            <div>
              <span className="volleyball-eyebrow">
                GLOBAL VOLLEYBALL
              </span>

              <h2>Browse Countries</h2>

              <p>
                Find your country and discover its volleyball teams.
              </p>
            </div>

            <span className="volleyball-count">
              {filteredCountries.length} countries
            </span>
          </div>

          <div className="volleyball-search-wrapper">
            <span className="volleyball-search-icon">⌕</span>

            <input
              type="text"
              className="volleyball-country-search"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="volleyball-state">
              <div className="volleyball-loader" />
              <h3>Loading countries</h3>
              <p>Discovering volleyball nations around the world...</p>
            </div>
          ) : error ? (
            <div className="volleyball-state volleyball-error-state">
              <h3>Unable to load countries</h3>
              <p>{error}</p>
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className="volleyball-state">
              <span className="volleyball-empty-icon">⌕</span>
              <h3>No countries found</h3>
              <p>
                {search
                  ? "Try searching with a different country name."
                  : "No volleyball countries are currently available."}
              </p>
            </div>
          ) : (
            <div className="volleyball-countries-grid">
              {filteredCountries.map((country) => (
                <button
                  type="button"
                  className="volleyball-country-card"
                  key={country.id || country.code}
                  onClick={() => {
                    window.location.href = `/volleyball/teams/${encodeURIComponent(
                      country.name
                    )}`;
                  }}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="volleyball-country-flag"
                    loading="lazy"
                  />

                  <span className="volleyball-country-name">
                    {country.name}
                  </span>

                  <span className="volleyball-country-arrow">↗</span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default VolleyballCountriesPage;