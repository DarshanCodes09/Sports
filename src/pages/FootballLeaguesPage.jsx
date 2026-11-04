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
    const getData = async () => {
      try {
        const data = await getFootballLeagues();
        setLeagues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const countries = [...new Set(
    leagues.map(item => item.country.name)
  )].sort();

  const seasons = [...new Set(
    leagues.flatMap(item =>
      (item.seasons || []).map(s => s.year)
    )
  )].sort((a, b) => b - a);

  const filtered = leagues.filter(item => {
    const matchSearch = item.league.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCountry =
      country === "All" || item.country.name === country;

    const matchType =
      type === "All" || item.league.type === type;

    const matchSeason =
      season === "All" ||
      (item.seasons || []).some(s => String(s.year) === season);

    return matchSearch && matchCountry && matchType && matchSeason;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const shown = filtered.slice(start, start + perPage);

  if (loading) return <h2>Loading leagues...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="football-leagues">
      <h1>Football Leagues</h1>

      <div className="league-filters">
        <input
          type="text"
          placeholder="Search leagues..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select value={country} onChange={e => {
          setCountry(e.target.value);
          setPage(1);
        }}>
          <option value="All">All Countries</option>
          {countries.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select value={type} onChange={e => {
          setType(e.target.value);
          setPage(1);
        }}>
          <option value="All">All Types</option>
          <option value="League">League</option>
          <option value="Cup">Cup</option>
        </select>

        <select value={season} onChange={e => {
          setSeason(e.target.value);
          setPage(1);
        }}>
          <option value="All">All Seasons</option>
          {seasons.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <p className="league-count">
        Showing {filtered.length} leagues
      </p>

      <div className="leagues-grid">
        {shown.map(item => (
          <div className="league-card" key={item.league.id}>
            <img src={item.league.logo} alt={item.league.name} />
            <h3>{item.league.name}</h3>

            <div className="league-country">
              {item.country.flag && (
                <img src={item.country.flag} alt={item.country.name} />
              )}
              <p>{item.country.name}</p>
            </div>

            <span>{item.league.type}</span>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p>No leagues found.</p>}

      {totalPages > 1 && (
        <div className="league-pages">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>{page} / {totalPages}</span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default FootballLeaguesPage;