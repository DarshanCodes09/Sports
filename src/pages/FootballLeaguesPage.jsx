
import React, { useEffect, useState } from "react";
import { getFootballLeagues } from "../services/footballService";
import "../styles/Football.css";

function FootballLeaguesPage() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [type, setType] = useState("All");
  const [season, setSeason] = useState("All");
  const [page, setPage] = useState(1);

  const perPage = 30;

  useEffect(() => {
    let active = true;

    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getFootballLeagues();

        if (active) {
          setLeagues(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load football leagues.");
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

  const countries = [
    ...new Set(leagues.map((item) => item.country?.name).filter(Boolean)),
  ].sort();

  const seasons = [
    ...new Set(
      leagues.flatMap((item) =>
        (item.seasons || []).map((s) => s.year).filter(Boolean)
      )
    ),
  ].sort((a, b) => b - a);

  const filtered = leagues.filter((item) => {
    const leagueName = item.league?.name || "";
    const countryName = item.country?.name || "";

    const matchSearch = leagueName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCountry =
      country === "All" || countryName === country;

    const matchType =
      type === "All" || item.league?.type === type;

    const matchSeason =
      season === "All" ||
      (item.seasons || []).some((s) => String(s.year) === season);

    return matchSearch && matchCountry && matchType && matchSeason;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const shown = filtered.slice(start, start + perPage);

  return (
    <main className="football-library-page">
      <div className="football-page-container">

        <div className="football-breadcrumb">
          <span>Sports</span>
          <span>/</span>
          <span>Football</span>
          <span>/</span>
          <strong>Leagues</strong>
        </div>

        <section className="football-page-hero">
          <div className="football-page-hero-content">
            <span className="football-eyebrow">THE COMPETITION DIRECTORY</span>
            <h1>Football Leagues</h1>
            <p>
              Explore football competitions from across the globe.
              Discover leagues and cups, browse countries and find seasons.
            </p>
          </div>

          <div className="football-hero-decoration" aria-hidden="true">
            🏆
          </div>
        </section>

        <section className="football-directory-section">
          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">GLOBAL COMPETITIONS</span>
              <h2>Explore Leagues</h2>
              <p>Find competitions using the filters below.</p>
            </div>

            <span className="football-result-count">
              {loading ? "Loading..." : `${filtered.length} leagues`}
            </span>
          </div>

          <div className="football-league-filters">
            <div className="football-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="text"
                placeholder="Search leagues..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">All Countries</option>
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
              <option value="All">All Types</option>
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
              <option value="All">All Seasons</option>
              {seasons.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="football-state">
              <div className="football-loader" />
              <h3>Loading competitions</h3>
              <p>Finding football leagues around the world...</p>
            </div>
          )}

          {!loading && error && (
            <div className="football-state football-error">
              <h3>Unable to load leagues</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="football-state">
              <h3>No leagues found</h3>
              <p>
                Try changing your search or filter selections.
              </p>
            </div>
          )}

          {!loading && !error && shown.length > 0 && (
            <div className="football-leagues-grid">
              {shown.map((item, index) => (
                <article
                  className="football-league-directory-card"
                  key={item.league?.id || index}
                >
                  <div className="football-league-card-top">
                    <div className="football-league-logo">
                      {item.league?.logo ? (
                        <img
                          src={item.league.logo}
                          alt={`${item.league.name} logo`}
                        />
                      ) : (
                        <span>🏆</span>
                      )}
                    </div>

                    <span className="football-league-type">
                      {item.league?.type || "Competition"}
                    </span>
                  </div>

                  <h3>{item.league?.name || "Unknown league"}</h3>

                  <div className="football-league-country">
                    {item.country?.flag && (
                      <img
                        src={item.country.flag}
                        alt={`${item.country.name} flag`}
                      />
                    )}
                    <span>{item.country?.name || "International"}</span>
                  </div>

                  <div className="football-league-card-footer">
                    <span>
                      {(item.seasons || []).length} seasons available
                    </span>
                    <span className="football-league-arrow">↗</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && totalPages > 1 && (
            <div className="football-pagination">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default FootballLeaguesPage;
