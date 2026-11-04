import React, { useEffect, useState } from "react";
import { getTeams } from "../services/cricketService";
import "../styles/CricketLists.css";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCountries() {
      try {
        const teams = await getTeams();

        const internationalTeams = teams.filter(
          (team) =>
            team.type === "international" &&
            team.team &&
            team.name
        );

        setCountries(internationalTeams);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCountries();
  }, []);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error}</p>;

    return (
    <main>
        <h1>Cricket Countries</h1>

        <div className="country-list">
        {countries.map((country) => (
            <button
            className="country-item"
            key={country.team}
            onClick={() =>
                (window.location.href = `/countries/${country.team}/players`)
            }
            >
            {country.name}
            <span>{country.matches} matches</span>
            </button>
        ))}
        </div>
    </main>
    );
}