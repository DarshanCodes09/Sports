import React, { useEffect, useState } from "react";
import { getBasketballCountries } from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballCountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getBasketballCountries();

            const filtered = data.filter((item) =>
            item.code?.trim() && item.flag?.trim()
            );

        setCountries(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <h2>Loading countries...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="basketball-countries">
      <h1>Basketball Countries</h1>

      <div className="countries-grid">
        {countries.map((item) => (
          <div
            className="country-card"
            key={item.id}
            onClick={() => {
              window.location.href = `/basketball/teams/${encodeURIComponent(item.name)}`;
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

export default BasketballCountriesPage;