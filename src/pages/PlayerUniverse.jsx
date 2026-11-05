import { useState } from "react";
import {
  searchPlayers,
  getPlayerProfile,
  getPlayerStats,
} from "../services/cricketService";
import "../styles/CricketLists.css";

function PlayerUniverse() {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setError("");
    setPlayers([]);
    setProfile(null);
    setStats(null);
    setHasSearched(true);

    try {
      const results = await searchPlayers(query.trim());
      setPlayers(results || []);

      if (!results || results.length === 0) {
        setError("No players found. Try searching with another name.");
      }
    } catch (err) {
      setError(err.message || "Player search failed.");
    } finally {
      setLoading(false);
    }
  }

  async function openPlayer(player) {
    if (loading) return;

    setLoading(true);
    setError("");
    setProfile(null);
    setStats(null);

    try {
      const [playerData, statsData] = await Promise.all([
        getPlayerProfile(player.player),
        getPlayerStats(player.player),
      ]);

      setProfile(playerData);
      setStats(statsData);
    } catch (err) {
      setError(err.message || "Could not load player details.");
    } finally {
      setLoading(false);
    }
  }

  function formatNumber(value) {
    if (value === null || value === undefined || value === "") return "—";

    return typeof value === "number"
      ? value.toLocaleString("en-IN")
      : value;
  }

  function goBackToResults() {
    setProfile(null);
    setStats(null);
    setError("");
  }

  const formats = [
    { key: "test", label: "Test Cricket" },
    { key: "odi", label: "One Day International" },
    { key: "t20i", label: "T20 International" },
    { key: "t20_leagues", label: "T20 Leagues" },
  ];

  return (
    <main className="universe-page">
      <div className="universe-container">
        <section className="universe-hero">
          <div className="universe-hero-content">
            <span className="universe-eyebrow">
              STRIVORA / CRICKET / PLAYER UNIVERSE
            </span>

            <h1>
              Every player.
              <br />
              <span>Every story.</span>
            </h1>

            <p>
              Explore cricketing careers, discover player profiles and
              uncover the numbers behind the game.
            </p>
          </div>

          <div className="universe-hero-art" aria-hidden="true">
            <span>11</span>
            <div className="universe-hero-ball">🏏</div>
            <small>THE PLAYER DIRECTORY</small>
          </div>
        </section>

        <section className="universe-search-section">
          <div className="universe-section-intro">
            <span className="universe-eyebrow">FIND YOUR PLAYER</span>
            <h2>Who are you looking for?</h2>
            <p>Search by player name to explore their cricket journey.</p>
          </div>

          <form className="universe-search" onSubmit={handleSearch}>
            <span className="universe-search-icon">⌕</span>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a player, e.g. Virat Kohli"
              aria-label="Search cricket players"
            />

            {query && (
              <button
                type="button"
                className="universe-clear-button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

            <button
              className="universe-search-button"
              type="submit"
              disabled={loading || !query.trim()}
            >
              {loading ? "Searching..." : "Search players"}
              <span>→</span>
            </button>
          </form>
        </section>

        {error && !profile && (
          <div className="universe-message universe-error">
            <span>!</span>
            <div>
              <strong>Something went wrong</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="universe-loading">
            <div className="universe-spinner" />
            <p>Finding the cricket stories...</p>
          </div>
        )}

        {players.length > 0 && !profile && !loading && (
          <section className="universe-results">
            <div className="universe-results-heading">
              <div>
                <span className="universe-eyebrow">PLAYER DIRECTORY</span>
                <h2>Search results</h2>
              </div>

              <span className="universe-results-count">
                {players.length} players found
              </span>
            </div>

            <div className="universe-player-grid">
              {players.map((player) => (
                <button
                  className="universe-player-card"
                  key={player.player}
                  onClick={() => openPlayer(player)}
                  disabled={loading}
                >
                  <div className="universe-player-card-top">
                    <span className="universe-player-avatar">
                      {player.name?.charAt(0)?.toUpperCase() || "P"}
                    </span>
                    <span className="universe-player-arrow">↗</span>
                  </div>

                  <span className="universe-card-label">CRICKET PLAYER</span>

                  <h3>{player.name}</h3>

                  <p>
                    {formatNumber(player.matches)} matches played
                  </p>

                  <span className="universe-view-profile">
                    Explore profile <span>→</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {!hasSearched && !profile && !loading && (
          <section className="universe-discover">
            <div className="universe-discover-icon">🏏</div>
            <span className="universe-eyebrow">THE GAME IS ABOUT PEOPLE</span>
            <h2>Discover the players behind the numbers.</h2>
            <p>
              Search for a cricketer to explore their profile, teams and
              career statistics.
            </p>
          </section>
        )}

        {profile && (
          <section className="universe-profile">
            <button
              className="universe-back-button"
              onClick={goBackToResults}
            >
              ← Back to search results
            </button>

            <div className="universe-profile-hero">
              <div className="universe-profile-avatar">🏏</div>

              <div className="universe-profile-heading">
                <span className="universe-eyebrow">PLAYER PROFILE</span>
                <h2>{profile.name}</h2>
                <p>
                  {profile.country ||
                    profile.nationality ||
                    "Country unavailable"}
                </p>
              </div>

              <div className="universe-profile-mark">STRIVORA</div>
            </div>

            <section className="universe-profile-section">
              <div className="universe-section-heading">
                <span className="universe-eyebrow">PLAYER INFORMATION</span>
                <h3>At a glance</h3>
              </div>

              <div className="universe-details-grid">
                <div>
                  <span>Born</span>
                  <strong>{profile.born || "Not available"}</strong>
                </div>

                <div>
                  <span>Birthplace</span>
                  <strong>{profile.birthplace || "Not available"}</strong>
                </div>

                <div>
                  <span>Batting style</span>
                  <strong>
                    {profile.batting_style || "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Bowling style</span>
                  <strong>
                    {profile.bowling_style || "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Matches</span>
                  <strong>{formatNumber(profile.matches)}</strong>
                </div>

                <div>
                  <span>First match</span>
                  <strong>{profile.first_match || "Not available"}</strong>
                </div>
              </div>
            </section>

            <section className="universe-profile-section">
              <div className="universe-section-heading">
                <span className="universe-eyebrow">TEAM HISTORY</span>
                <h3>Teams represented</h3>
              </div>

              <div className="universe-team-list">
                {(profile.teams || []).map((team) => (
                  <div className="universe-team-card" key={team.team}>
                    <span className="universe-team-icon">🏏</span>
                    <div>
                      <strong>{team.name}</strong>
                      <span>
                        {formatNumber(team.matches)} matches
                      </span>
                    </div>
                  </div>
                ))}

                {(!profile.teams || profile.teams.length === 0) && (
                  <p className="universe-muted-message">
                    Team information is not available.
                  </p>
                )}
              </div>
            </section>

            <section className="universe-profile-section">
              <div className="universe-section-heading">
                <span className="universe-eyebrow">CAREER BREAKDOWN</span>
                <h3>Career statistics</h3>
              </div>

              {!stats ? (
                <div className="universe-message">
                  <p>Career statistics are not available.</p>
                </div>
              ) : (
                <div className="universe-stats-list">
                  {formats.map(({ key, label }) => {
                    const batting = stats.batting?.[key];
                    const bowling = stats.bowling?.[key];

                    if (!batting && !bowling) return null;

                    return (
                      <article className="universe-stats-card" key={key}>
                        <h4>{label}</h4>

                        {batting && (
                          <div className="universe-stat-group">
                            <span className="universe-stats-label">
                              BATTING
                            </span>

                            <div className="universe-stats-grid">
                              <div>
                                <span>Runs</span>
                                <strong>{formatNumber(batting.runs)}</strong>
                              </div>
                              <div>
                                <span>Average</span>
                                <strong>
                                  {formatNumber(batting.average)}
                                </strong>
                              </div>
                              <div>
                                <span>Strike rate</span>
                                <strong>
                                  {formatNumber(batting.strike_rate)}
                                </strong>
                              </div>
                              <div>
                                <span>Hundreds</span>
                                <strong>
                                  {formatNumber(batting.hundreds)}
                                </strong>
                              </div>
                              <div>
                                <span>Fifties</span>
                                <strong>
                                  {formatNumber(batting.fifties)}
                                </strong>
                              </div>
                              <div>
                                <span>High score</span>
                                <strong>
                                  {formatNumber(batting.high_score)}
                                </strong>
                              </div>
                            </div>
                          </div>
                        )}

                        {bowling && (
                          <div className="universe-stat-group">
                            <span className="universe-stats-label">
                              BOWLING
                            </span>

                            <div className="universe-stats-grid">
                              <div>
                                <span>Wickets</span>
                                <strong>
                                  {formatNumber(bowling.wickets)}
                                </strong>
                              </div>
                              <div>
                                <span>Economy</span>
                                <strong>
                                  {formatNumber(bowling.economy)}
                                </strong>
                              </div>
                              <div>
                                <span>Average</span>
                                <strong>
                                  {formatNumber(bowling.average)}
                                </strong>
                              </div>
                              <div>
                                <span>Best</span>
                                <strong>
                                  {formatNumber(bowling.best)}
                                </strong>
                              </div>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </section>
        )}
      </div>
    </main>
  );
}

export default PlayerUniverse;