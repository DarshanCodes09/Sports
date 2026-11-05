import React, { useEffect, useState } from "react";
import { getTeams } from "../services/cricketService";
import "../styles/CricketLists.css";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCountries() {
      try {
        const teams = await getTeams();
        console.log("Cricket API response:", teams);
        console.log("Is array:", Array.isArray(teams));
        console.log("First team:", teams?.[0]);

        const internationalTeams = (Array.isArray(teams) ? teams : []).filter(
          (team) =>
            team.type === "international" &&
            team.team &&
            team.name
        );

        setCountries(internationalTeams);
      } catch (err) {
        setError(err.message || "Unable to load cricket countries.");
      } finally {
        setLoading(false);
      }
    }

    loadCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main className="cricket-library-page">
      <div className="cricket-page-container">
        <div className="cricket-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <strong>Cricket Countries</strong>
        </div>

        <section className="cricket-page-hero">
          <div>
            <span className="cricket-eyebrow">
              THE WORLD OF CRICKET
            </span>

            <h1>Explore Cricket Nations</h1>

            <p>
              Discover international cricket teams from around the world.
              Choose a country to explore its players and cricket community.
            </p>
          </div>

          <div className="cricket-hero-icon" aria-hidden="true">
            🏏
          </div>
        </section>

        <section className="cricket-directory-section">
          <div className="cricket-section-heading">
            <div>
              <span className="cricket-eyebrow">
                GLOBAL CRICKET
              </span>

              <h2>Browse Countries</h2>

              <p>
                Find a cricket nation and discover its players.
              </p>
            </div>

            <span className="cricket-count">
              {filteredCountries.length} countries
            </span>
          </div>

          <div className="cricket-search-wrapper">
            <span className="cricket-search-icon">⌕</span>

            <input
              type="text"
              className="cricket-country-search"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="cricket-state">
              <div className="cricket-loader" />
              <h3>Loading countries</h3>
              <p>Discovering international cricket nations...</p>
            </div>
          ) : error ? (
            <div className="cricket-state">
              <h3>Unable to load countries</h3>
              <p>{error}</p>
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className="cricket-state">
              <span className="cricket-empty-icon">⌕</span>
              <h3>No countries found</h3>
              <p>
                {search
                  ? "Try searching with a different country name."
                  : "No international cricket countries are currently available."}
              </p>
            </div>
          ) : (
            <div className="cricket-countries-grid">
              {filteredCountries.map((country) => (
                <button
                  type="button"
                  className="cricket-country-card"
                  key={country.team}
                  onClick={() => {
                    window.location.href = `/countries/${country.team}/players`;
                  }}
                >
                  <div className="cricket-country-icon">
                    🏏
                  </div>

                  <div className="cricket-country-info">
                    <h3>{country.name}</h3>
                    <span>{country.matches ?? 0} matches</span>
                  </div>

                  <span className="cricket-country-arrow">↗</span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}