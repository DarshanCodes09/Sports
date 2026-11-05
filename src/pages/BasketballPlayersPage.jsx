
import React, { useEffect, useState } from "react";
import {
  getBasketballTeams,
  getBasketballPlayers,
} from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballPlayersPage() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [season, setSeason] = useState("2023");
  const [search, setSearch] = useState("");

  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const getTeams = async () => {
      try {
        setError("");
        const data = await getBasketballTeams({ country: "USA" });
        setTeams(data);
      } catch (err) {
        setError(err.message || "Unable to load basketball teams.");
      } finally {
        setLoadingTeams(false);
      }
    };

    getTeams();
  }, []);

  const searchPlayers = async () => {
    if (!teamId) {
      setError("Please select a team first.");
      return;
    }

    setLoadingPlayers(true);
    setError("");
    setPlayers([]);
    setHasSearched(true);

    try {
      const data = await getBasketballPlayers({
        team: teamId,
        season,
      });

      setPlayers(data);
    } catch (err) {
      setError(err.message || "Unable to load players.");
    } finally {
      setLoadingPlayers(false);
    }
  };

  const filteredPlayers = players.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTeam = teams.find(
    (team) => String(team.id) === String(teamId)
  );

  const openPlayer = (item) => {
    const params = new URLSearchParams({
      name: item.name || "",
      number: item.number || "",
      position: item.position || "",
      country: item.country || "",
      age: item.age || "",
      team: selectedTeam?.name || "",
      season,
    });

    window.location.href = `/basketball/player/${item.id}?${params.toString()}`;
  };

  return (
    <main className="basketball-library-page">
      <div className="basketball-page-container">
        <div className="basketball-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Basketball</span>
          <span>/</span>
          <strong>Players</strong>
        </div>

        <section className="basketball-page-hero">
          <div className="basketball-hero-content">
            <span className="basketball-eyebrow">
              MEET THE ATHLETES
            </span>

            <h1>Basketball Players</h1>

            <p>
              Discover basketball players, explore their profiles
              and find the athletes representing their teams.
            </p>
          </div>

          <div className="basketball-hero-decoration" aria-hidden="true">
            <span>🏀</span>
          </div>
        </section>

        <section className="basketball-directory-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">
                PLAYER DIRECTORY
              </span>
              <h2>Find Your Player</h2>
              <p>
                Select a team and season to explore its players.
              </p>
            </div>

            {!loadingPlayers && hasSearched && !error && (
              <span className="basketball-result-count">
                {filteredPlayers.length} players
              </span>
            )}
          </div>

          <div className="basketball-player-search-panel">
            {loadingTeams ? (
              <div className="basketball-filter-loading">
                <div className="basketball-loader"></div>
                <span>Loading teams...</span>
              </div>
            ) : (
              <>
                <div className="basketball-player-filter">
                  <label htmlFor="basketball-team-select">
                    SELECT TEAM
                  </label>

                  <select
                    id="basketball-team-select"
                    value={teamId}
                    onChange={(e) => {
                      setTeamId(e.target.value);
                      setPlayers([]);
                      setSearch("");
                      setError("");
                      setHasSearched(false);
                    }}
                  >
                    <option value="">Choose a team</option>

                    {teams.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="basketball-player-filter">
                  <label htmlFor="basketball-season-select">
                    SELECT SEASON
                  </label>

                  <select
                    id="basketball-season-select"
                    value={season}
                    onChange={(e) => {
                      setSeason(e.target.value);
                      setPlayers([]);
                      setError("");
                      setHasSearched(false);
                    }}
                  >
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                <button
                  className="basketball-player-search-button"
                  onClick={searchPlayers}
                  disabled={loadingPlayers || !teamId}
                >
                  {loadingPlayers ? "Searching..." : "Search Players"}
                  <span>↗</span>
                </button>
              </>
            )}
          </div>

          {error && (
            <div className="basketball-inline-error">
              {error}
            </div>
          )}

          {hasSearched && !loadingPlayers && !error && players.length > 0 && (
            <div className="basketball-player-results-header">
              <div>
                <h3>{selectedTeam?.name || "Selected Team"}</h3>
                <p>Season {season}</p>
              </div>
              <span>{players.length} players found</span>
            </div>
          )}

          {hasSearched && players.length > 0 && (
            <div className="basketball-search-wrapper basketball-player-name-search">
              <span className="basketball-search-icon">⌕</span>

              <input
                type="text"
                className="basketball-country-search"
                placeholder="Search player name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button
                  className="basketball-clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          )}

          {loadingPlayers ? (
            <div className="basketball-state">
              <div className="basketball-loader"></div>
              <h3>Finding players</h3>
              <p>Getting player information for this team...</p>
            </div>
          ) : hasSearched && !error && filteredPlayers.length === 0 ? (
            <div className="basketball-state">
              <span>⌕</span>
              <h3>No players found</h3>
              <p>
                {players.length === 0
                  ? "No players are available for this team and season."
                  : "No players match your search. Try another name."}
              </p>
            </div>
          ) : !hasSearched && !error ? (
            <div className="basketball-state basketball-player-initial-state">
              <span>🏀</span>
              <h3>Ready to discover players?</h3>
              <p>
                Choose a team and season above, then click Search Players.
              </p>
            </div>
          ) : (
            !error &&
            filteredPlayers.length > 0 && (
              <div className="basketball-player-directory-grid">
                {filteredPlayers.map((item) => (
                  <button
                    className="basketball-player-directory-card"
                    key={item.id}
                    onClick={() => openPlayer(item)}
                  >
                    <div className="basketball-player-number">
                      {item.number || "—"}
                    </div>

                    <div className="basketball-player-info">
                      <h3>
                        {(item.name || "Unknown player").replaceAll(
                          "&apos;",
                          "'"
                        )}
                      </h3>

                      <p>{item.position || "Position unavailable"}</p>

                      <div className="basketball-player-meta">
                        <span>{item.country || "Country N/A"}</span>
                        <span>Age {item.age || "N/A"}</span>
                      </div>
                    </div>

                    <span className="basketball-player-arrow">↗</span>
                  </button>
                ))}
              </div>
            )
          )}
        </section>
      </div>
    </main>
  );
}

export default BasketballPlayersPage;
