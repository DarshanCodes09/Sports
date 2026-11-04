import React, { useEffect, useState } from "react";
import { getFootballCountries } from "../services/footballService";
import "../styles/Football.css";

function FootballCountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getFootballCountries();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <h2>Loading countries...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="football-countries">
      <h1>Football Countries</h1>

            <div className="countries-grid">
              {countries.map((item, index) => (
                <div
        className="country-card"
        key={item.code || index}
        onClick={() => {
          window.location.href = `/football/teams/${encodeURIComponent(item.name)}`;
        }}
        style={{ cursor: "pointer" }}
      >
            <img src={item.flag} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FootballCountriesPage;