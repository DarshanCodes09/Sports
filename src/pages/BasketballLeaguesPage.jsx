
import React, { useEffect, useState } from "react";
import { getBasketballLeagues } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballLeaguesPage() {
  const [leagues, setLeagues] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [season, setSeason] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBasketballLeagues();
        setLeagues(data);
      } catch (err) {
        setError(err.message || "Unable to load basketball leagues.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const countries = [
    ...new Set(
      leagues.map((item) => item.country?.name).filter(Boolean)
    ),
  ].sort();

  const seasons = [
    ...new Set(
      leagues.flatMap((item) =>
        item.seasons?.map((s) => s.season) || []
      )
    ),
  ].sort((a, b) => b - a);

  const filteredLeagues = leagues.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCountry =
      !country || item.country?.name === country;

    const matchesType =
      !type || item.type?.toLowerCase() === type.toLowerCase();

    const matchesSeason =
      !season ||
      item.seasons?.some((s) => String(s.season) === season);

    return (
      matchesSearch &&
      matchesCountry &&
      matchesType &&
      matchesSeason
    );
  });

  const leaguesPerPage = 30;
  const totalPages = Math.ceil(filteredLeagues.length / leaguesPerPage);
  const start = (page - 1) * leaguesPerPage;
  const currentLeagues = filteredLeagues.slice(
    start,
    start + leaguesPerPage
  );

  const clearFilters = () => {
    setSearch("");
    setCountry("");
    setType("");
    setSeason("");
    setPage(1);
  };

  return (
    <main className="basketball-library-page">
      <div className="basketball-page-container">
        <div className="basketball-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Basketball</span>
          <span>/</span>
          <strong>Leagues</strong>
        </div>

        <section className="basketball-page-hero">
          <div className="basketball-hero-content">
            <span className="basketball-eyebrow">
              THE COMPETITIVE SIDE
            </span>

            <h1>Basketball Leagues</h1>

            <p>
              Explore basketball competitions around the world.
              Discover leagues, cups and seasons from different countries.
            </p>
          </div>

          <div className="basketball-hero-decoration" aria-hidden="true">
            <span>🏆</span>
          </div>
        </section>

        <section className="basketball-directory-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">
                COMPETITION DIRECTORY
              </span>
              <h2>Explore Competitions</h2>
              <p>Find competitions using the filters below.</p>
            </div>

            {!loading && !error && (
              <span className="basketball-result-count">
                {filteredLeagues.length} leagues
              </span>
            )}
          </div>

          <div className="basketball-league-filter-panel">
            <div className="basketball-search-wrapper">
              <span className="basketball-search-icon">⌕</span>

              <input
                type="text"
                className="basketball-country-search"
                placeholder="Search league name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="basketball-league-filters">
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Countries</option>
                {countries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Types</option>
                <option value="League">League</option>
                <option value="Cup">Cup</option>
              </select>

              <select
                value={season}
                onChange={(e) => {
                  setSeason(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Seasons</option>
                {seasons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {(search || country || type || season) && (
                <button
                  className="basketball-filter-reset"
                  onClick={clearFilters}
                >
                  Clear filters ×
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="basketball-state">
              <div className="basketball-loader"></div>
              <h3>Loading competitions</h3>
              <p>Gathering basketball league information...</p>
            </div>
          ) : error ? (
            <div className="basketball-state basketball-error">
              <span>!</span>
              <h3>Unable to load leagues</h3>
              <p>{error}</p>
            </div>
          ) : filteredLeagues.length === 0 ? (
            <div className="basketball-state">
              <span>⌕</span>
              <h3>No leagues found</h3>
              <p>
                Try changing your search or removing some filters.
              </p>
            </div>
          ) : (
            <>
              <div className="basketball-leagues-grid">
                {currentLeagues.map((item) => (
                  <button
                    className="basketball-league-card"
                    key={item.id}
                    onClick={() => {
                      window.location.href = `/basketball/leagues/${item.id}`;
                    }}
                  >
                    <div className="basketball-league-logo">
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        loading="lazy"
                      />
                    </div>

                    <div className="basketball-league-info">
                      <span className="basketball-league-type">
                        {item.type || "Competition"}
                      </span>

                      <h3>{item.name}</h3>

                      <p>
                        {item.country?.name || "International"}
                      </p>
                    </div>

                    <span className="basketball-league-arrow">↗</span>
                  </button>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="basketball-pagination">
                  <button
                    onClick={() =>
                      setPage((current) => current - 1)
                    }
                    disabled={page === 1}
                  >
                    Previous
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setPage((current) => current + 1)
                    }
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

export default BasketballLeaguesPage;
