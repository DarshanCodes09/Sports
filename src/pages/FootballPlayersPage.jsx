
import React, { useEffect, useState } from "react";
import {
  getFootballPlayers,
  getFootballCountries,
  getFootballLeagues
} from "../services/footballService";
import "../styles/Football.css";

function FootballPlayersPage() {
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [players, setPlayers] = useState([]);

  const [country, setCountry] = useState("");
  const [league, setLeague] = useState("");
  const [season, setSeason] = useState("2024");
  const [search, setSearch] = useState("");

  const [countriesLoading, setCountriesLoading] = useState(true);
  const [leaguesLoading, setLeaguesLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    let active = true;

    const getData = async () => {
      try {
        const data = await getFootballCountries();

        if (active) {
          setCountries(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load countries.");
        }
      } finally {
        if (active) {
          setCountriesLoading(false);
        }
      }
    };

    getData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    setLeagues([]);
    setLeague("");
    setPlayers([]);
    setSearched(false);
    setError("");

    if (!country) {
      setLeaguesLoading(false);
      return () => {
        active = false;
      };
    }

    const getData = async () => {
      try {
        setLeaguesLoading(true);

        const data = await getFootballLeagues({ country });

        if (active) {
          setLeagues(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load leagues.");
        }
      } finally {
        if (active) {
          setLeaguesLoading(false);
        }
      }
    };

    getData();

    return () => {
      active = false;
    };
  }, [country]);

  const searchPlayers = async (e) => {
    e.preventDefault();

    if (!country || !league) {
      setError("Please select a country and league first.");
      return;
    }

    if (search.trim().length < 3) {
      setError("Enter at least 3 letters to search.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);
      setPlayers([]);

      const data = await getFootballPlayers({
        search: search.trim(),
        league,
        season
      });

      setPlayers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to search players.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="football-library-page">
      <div className="football-page-container">

        <div className="football-breadcrumb">
          <span>Sports</span>
          <span>/</span>
          <span>Football</span>
          <span>/</span>
          <strong>Players</strong>
        </div>

        <section className="football-page-hero">
          <div className="football-page-hero-content">
            <span className="football-eyebrow">PLAYER DIRECTORY</span>
            <h1>Discover Football Players</h1>
            <p>
              Search for football players across countries and competitions.
              Find player profiles, nationality, age and club information.
            </p>
          </div>

          <div className="football-hero-decoration" aria-hidden="true">
            ⚽
          </div>
        </section>

        <section className="football-directory-section">

          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">GLOBAL TALENT</span>
              <h2>Find Players</h2>
              <p>Choose a country, league and season to begin your search.</p>
            </div>

            <span className="football-result-count">
              {loading ? "Searching..." : `${players.length} players`}
            </span>
          </div>

          <form
            className="football-player-search-panel"
            onSubmit={searchPlayers}
          >
            <div className="football-player-filter">
              <label htmlFor="football-country">Country</label>
              <select
                id="football-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={countriesLoading}
              >
                <option value="">
                  {countriesLoading ? "Loading countries..." : "Select Country"}
                </option>

                {countries.map((item) => (
                  <option
                    key={item.code || item.name}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="football-player-filter">
              <label htmlFor="football-league">League</label>
              <select
                id="football-league"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
                disabled={!country || leaguesLoading}
              >
                <option value="">
                  {leaguesLoading ? "Loading leagues..." : "Select League"}
                </option>

                {leagues.map((item) => (
                  <option
                    key={item.league.id}
                    value={item.league.id}
                  >
                    {item.league.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="football-player-filter">
              <label htmlFor="football-season">Season</label>
              <select
                id="football-season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="2024">2024 Season</option>
                <option value="2023">2023 Season</option>
                <option value="2022">2022 Season</option>
              </select>
            </div>

            <div className="football-player-filter football-player-name-filter">
              <label htmlFor="football-player-name">Player name</label>
              <input
                id="football-player-name"
                type="text"
                placeholder="Enter at least 3 letters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="football-player-search-button"
              type="submit"
              disabled={loading || leaguesLoading}
            >
              {loading ? "Searching..." : "Search Players"}
              <span>↗</span>
            </button>
          </form>

          {error && (
            <div className="football-player-error">
              {error}
            </div>
          )}

          {loading && (
            <div className="football-state">
              <div className="football-loader" />
              <h3>Searching players</h3>
              <p>Finding matching football players...</p>
            </div>
          )}

          {!loading && searched && !error && players.length === 0 && (
            <div className="football-state">
              <h3>No players found</h3>
              <p>Try another player name or change your filters.</p>
            </div>
          )}

          {!loading && !searched && !error && (
            <div className="football-player-initial-state">
              <span>⚽</span>
              <h3>Your next discovery starts here</h3>
              <p>
                Select a country and league, enter a player name,
                and search to explore football talent.
              </p>
            </div>
          )}

          {!loading && players.length > 0 && (
            <div className="football-player-directory-grid">
              {players.map((item, index) => (
                <button
                  className="football-player-directory-card"
                  type="button"
                  key={item.player?.id || index}
                  onClick={() => {
                    window.location.href =
                      `/football/players/${item.player.id}`;
                  }}
                >
                  <div className="football-player-photo">
                    {item.player?.photo ? (
                      <img
                        src={item.player.photo}
                        alt={item.player.name}
                      />
                    ) : (
                      <span>⚽</span>
                    )}
                  </div>

                  <div className="football-player-directory-info">
                    <h3>{item.player?.name || "Unknown player"}</h3>

                    <p>
                      {item.player?.nationality || "Nationality unavailable"}
                    </p>

                    <div className="football-player-meta">
                      <span>
                        Age: {item.player?.age ?? "N/A"}
                      </span>
                    </div>

                    <p className="football-player-club">
                      {item.statistics?.[0]?.team?.name || "Club unavailable"}
                    </p>
                  </div>

                  <span className="football-country-arrow">↗</span>
                </button>
              ))}
            </div>
          )}

        </section>
      </div>
    </main>
  );
}

export default FootballPlayersPage;
