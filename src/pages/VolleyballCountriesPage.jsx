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

        const filtered = data.filter(
          (country) => country.code && country.flag
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

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading volleyball countries...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="volleyball-countries-page">
      <h1>Volleyball Countries</h1>

      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{filteredCountries.length} countries found</p>

      <div className="volleyball-countries-grid">
        {filteredCountries.map((country) => (
          <div
            className="volleyball-country-card"
            key={country.id}
            onClick={() => {
              window.location.href = `/volleyball/teams/${encodeURIComponent(
                country.name
              )}`;
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={country.flag} alt={country.name} />
            <h3>{country.name}</h3>
          </div>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <p>No countries found.</p>
      )}
    </div>
  );
}

export default VolleyballCountriesPage;