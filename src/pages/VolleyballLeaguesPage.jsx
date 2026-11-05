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
        setLeagues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredLeagues = leagues.filter((league) => {
    const leagueName = league.name?.toLowerCase() || "";
    const countryName = league.country?.name?.toLowerCase() || "";

    return (
      leagueName.includes(search.toLowerCase()) ||
      countryName.includes(search.toLowerCase())
    );
  });

  if (loading) return <h2>Loading volleyball leagues...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="volleyball-leagues-page">
      <h1>Volleyball Leagues & Competitions</h1>

      <input
        type="text"
        placeholder="Search leagues or countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{filteredLeagues.length} competitions found</p>

      <div className="volleyball-leagues-grid">
        {filteredLeagues.map((league) => (
          <div
            className="volleyball-league-card"
            key={league.id}
            onClick={() => {
              window.location.href = `/volleyball/league/${league.id}`;
            }}
            style={{ cursor: "pointer" }}
          >
            {league.logo && (
              <img src={league.logo} alt={league.name} />
            )}

            <h3>{league.name}</h3>

            <p>
              {league.country?.flag && (
                <img
                  src={league.country.flag}
                  alt=""
                  style={{
                    width: "20px",
                    height: "14px",
                    objectFit: "cover",
                    marginRight: "6px",
                  }}
                />
              )}
              {league.country?.name || "International"}
            </p>

            <span>{league.type || "Competition"}</span>
          </div>
        ))}
      </div>

      {filteredLeagues.length === 0 && (
        <p>No volleyball competitions found.</p>
      )}
    </div>
  );
}

export default VolleyballLeaguesPage;