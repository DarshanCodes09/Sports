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
        const data = await getBasketballLeagues();
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
    leagues.map((item) => item.country?.name).filter(Boolean)
  )].sort();

  const filteredLeagues = leagues.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = !country || item.country?.name === country;
    const matchesType = !type || item.type?.toLowerCase() === type.toLowerCase();
    const matchesSeason = !season || item.seasons?.some(
      (s) => String(s.season) === season
    );

    return matchesSearch && matchesCountry && matchesType && matchesSeason;
  });

  const leaguesPerPage = 30;
  const totalPages = Math.ceil(filteredLeagues.length / leaguesPerPage);
  const start = (page - 1) * leaguesPerPage;
  const currentLeagues = filteredLeagues.slice(start, start + leaguesPerPage);

  if (loading) return <h2>Loading basketball leagues...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="basketball-leagues">
      <h1>Basketball Leagues</h1>

      <input
        type="text"
        className="team-search"
        placeholder="Search league name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="league-filters">
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Countries</option>
          {countries.map((item) => (
            <option key={item} value={item}>{item}</option>
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
          {[...new Set(
            leagues.flatMap((item) =>
              item.seasons?.map((s) => s.season) || []
            )
          )].sort((a, b) => b - a).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <p>Showing {filteredLeagues.length} leagues</p>

      <div className="leagues-grid">
        {currentLeagues.map((item) => (
          <div
            className="league-card"
            key={item.id}
            onClick={() => {
                window.location.href = `/basketball/leagues/${item.id}`;
            }}
            style={{ cursor: "pointer" }}
            >
            <img src={item.logo} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.country?.name || "International"}</p>
            <p>{item.type}</p>
        </div>
        ))}
      </div>

      {filteredLeagues.length === 0 && <p>No leagues found.</p>}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>Page {page} of {totalPages}</span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BasketballLeaguesPage;