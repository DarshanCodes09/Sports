
import { useState } from "react";
import {
  searchPlayers,
  getPlayerProfile,
  getPlayerStats,
} from "../services/cricketService";
import "../styles/PlayerUniverse.css";

function PlayerUniverse() {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setProfile(null);
    setStats(null);

    try {
      const results = await searchPlayers(query.trim());
      setPlayers(results);
      if (results.length === 0) setError("No players found. Try another name.");
    } catch (err) {
      setError(err.message || "Player search failed.");
    } finally {
      setLoading(false);
    }
  }

  async function openPlayer(player) {
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
    if (value === null || value === undefined) return "—";
    return typeof value === "number" ? value.toLocaleString("en-IN") : value;
  }

  return (
    <div className="universe-page">
      <div className="universe-heading">
        <p className="universe-eyebrow">STRIVORA / PLAYER UNIVERSE</p>
        <h1>Discover <span>Players.</span></h1>
        <p>Search cricket players and explore their careers.</p>
      </div>

      <form className="player-search" onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a player, e.g. Virat Kohli"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p className="universe-error">{error}</p>}

      {players.length > 0 && !profile && (
        <section className="player-results">
          <h2>Search results</h2>
          <div className="player-grid">
            {players.map((player) => (
              <button
                className="player-card"
                key={player.player}
                onClick={() => openPlayer(player)}
              >
                <span className="player-card-icon">🏏</span>
                <span className="player-card-name">{player.name}</span>
                <span className="player-card-meta">
                  {formatNumber(player.matches)} matches
                </span>
                <span className="player-card-link">View profile →</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {loading && <p className="universe-loading">Loading player data...</p>}

      {profile && (
        <section className="player-profile">
          <button
            className="back-button"
            onClick={() => {
              setProfile(null);
              setStats(null);
            }}
          >
            ← Back to results
          </button>

          <div className="profile-header">
            <div className="profile-avatar">🏏</div>
            <div>
              <p className="universe-eyebrow">PLAYER PROFILE</p>
              <h2>{profile.name}</h2>
              <p>{profile.country || profile.nationality || "Country unavailable"}</p>
            </div>
          </div>

          <div className="profile-details">
            <div><span>Born</span><strong>{profile.born || "Not available"}</strong></div>
            <div><span>Birthplace</span><strong>{profile.birthplace || "Not available"}</strong></div>
            <div><span>Batting</span><strong>{profile.batting_style || "Not available"}</strong></div>
            <div><span>Bowling</span><strong>{profile.bowling_style || "Not available"}</strong></div>
            <div><span>Matches</span><strong>{formatNumber(profile.matches)}</strong></div>
            <div><span>First match</span><strong>{profile.first_match || "Not available"}</strong></div>
          </div>

          <h3>Teams</h3>
          <div className="team-list">
            {(profile.teams || []).map((team) => (
              <div className="team-chip" key={team.team}>
                <strong>{team.name}</strong>
                <span>{formatNumber(team.matches)} matches</span>
              </div>
            ))}
            {(!profile.teams || profile.teams.length === 0) && (
              <p>Team information not available.</p>
            )}
          </div>

          <h3>Career statistics</h3>
          {stats && (
            <>
              {["test", "odi", "t20i", "t20_leagues"].map((format) => {
                const batting = stats.batting?.[format];
                const bowling = stats.bowling?.[format];

                if (!batting && !bowling) return null;

                const formatName = {
                  test: "Test",
                  odi: "ODI",
                  t20i: "T20 International",
                  t20_leagues: "T20 Leagues",
                }[format];

                return (
                  <div className="stats-card" key={format}>
                    <h4>{formatName}</h4>
                    {batting && (
                      <>
                        <p className="stats-label">BATTING</p>
                        <div className="stats-grid">
                          <div><span>Runs</span><strong>{formatNumber(batting.runs)}</strong></div>
                          <div><span>Average</span><strong>{formatNumber(batting.average)}</strong></div>
                          <div><span>Strike rate</span><strong>{formatNumber(batting.strike_rate)}</strong></div>
                          <div><span>Hundreds</span><strong>{formatNumber(batting.hundreds)}</strong></div>
                          <div><span>Fifties</span><strong>{formatNumber(batting.fifties)}</strong></div>
                          <div><span>High score</span><strong>{formatNumber(batting.high_score)}</strong></div>
                        </div>
                      </>
                    )}
                    {bowling && (
                      <>
                        <p className="stats-label">BOWLING</p>
                        <div className="stats-grid">
                          <div><span>Wickets</span><strong>{formatNumber(bowling.wickets)}</strong></div>
                          <div><span>Economy</span><strong>{formatNumber(bowling.economy)}</strong></div>
                          <div><span>Average</span><strong>{formatNumber(bowling.average)}</strong></div>
                          <div><span>Best</span><strong>{formatNumber(bowling.best)}</strong></div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </section>
      )}
    </div>
  );
}

export default PlayerUniverse;
