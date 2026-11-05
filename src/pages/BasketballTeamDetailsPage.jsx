
import React, { useEffect, useState } from "react";
import {
  getBasketballTeams,
  getBasketballPlayers,
} from "../services/basketballService";
import "../styles/Basketball.css";

function BasketballTeamDetailsPage() {
  const teamId = window.location.pathname.split("/").pop();

  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [season, setSeason] = useState("2023");

  const [loading, setLoading] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(false);

  const [error, setError] = useState("");
  const [squadError, setSquadError] = useState("");
  const [squadLoaded, setSquadLoaded] = useState(false);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBasketballTeams({ id: teamId });

        const selectedTeam = data.find(
          (item) => String(item.id) === String(teamId)
        );

        if (selectedTeam) {
          setTeam(selectedTeam);
        } else {
          setError("Team not found.");
        }
      } catch (err) {
        setError(err.message || "Unable to load team details.");
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, [teamId]);

  const loadPlayers = async () => {
    setLoadingPlayers(true);
    setSquadError("");
    setPlayers([]);
    setSquadLoaded(true);

    try {
      const data = await getBasketballPlayers({
        team: teamId,
        season,
      });

      setPlayers(data);
    } catch (err) {
      setSquadError(err.message || "Unable to load team squad.");
    } finally {
      setLoadingPlayers(false);
    }
  };

  const openPlayer = (item) => {
    const params = new URLSearchParams({
      name: item.name || "",
      number: item.number || "",
      position: item.position || "",
      country: item.country || "",
      age: item.age || "",
      team: team.name,
      season,
    });

    window.location.href =
      `/basketball/player/${item.id}?${params.toString()}`;
  };

  const goBack = () => window.history.back();

  if (loading) {
    return (
      <main className="basketball-library-page">
        <div className="basketball-page-container">
          <div className="basketball-state">
            <div className="basketball-loader"></div>
            <h3>Loading team details</h3>
            <p>Preparing team information...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !team) {
    return (
      <main className="basketball-library-page">
        <div className="basketball-page-container">
          <div className="basketball-state basketball-error">
            <span>!</span>
            <h3>Team unavailable</h3>
            <p>{error || "Team not found."}</p>
            <button className="basketball-back-button" onClick={goBack}>
              ← Back to Teams
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="basketball-library-page">
      <div className="basketball-page-container">
        <div className="basketball-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Basketball</span>
          <span>/</span>
          <span>Teams</span>
          <span>/</span>
          <strong>{team.name}</strong>
        </div>

        <button className="basketball-back-button" onClick={goBack}>
          ← Back to Teams
        </button>

        <section className="basketball-team-profile-hero">
          <div className="basketball-team-profile-logo">
            <img src={team.logo} alt={`${team.name} logo`} />
          </div>

          <div className="basketball-team-profile-info">
            <span className="basketball-eyebrow">
              TEAM PROFILE
            </span>

            <h1>{team.name}</h1>

            <div className="basketball-team-profile-meta">
              <span>{team.country?.name || "Country unavailable"}</span>
              <span>Team ID: {team.id}</span>
            </div>
          </div>

          <div className="basketball-team-profile-decoration">
            🏀
          </div>
        </section>

        <section className="basketball-directory-section">
          <div className="basketball-section-heading">
            <div>
              <span className="basketball-eyebrow">
                SQUAD DIRECTORY
              </span>
              <h2>Team Squad</h2>
              <p>
                Explore players representing {team.name}.
              </p>
            </div>

            {squadLoaded && !loadingPlayers && !squadError && (
              <span className="basketball-result-count">
                {players.length} players
              </span>
            )}
          </div>

          <div className="basketball-squad-filter-panel">
            <div className="basketball-player-filter">
              <label htmlFor="basketball-squad-season">
                SELECT SEASON
              </label>

              <select
                id="basketball-squad-season"
                value={season}
                onChange={(e) => {
                  setSeason(e.target.value);
                  setPlayers([]);
                  setSquadError("");
                  setSquadLoaded(false);
                }}
              >
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <button
              className="basketball-player-search-button"
              onClick={loadPlayers}
              disabled={loadingPlayers}
            >
              {loadingPlayers ? "Loading Squad..." : "Load Squad"}
              <span>↗</span>
            </button>
          </div>

          {loadingPlayers ? (
            <div className="basketball-state">
              <div className="basketball-loader"></div>
              <h3>Loading squad</h3>
              <p>Finding players for {team.name}...</p>
            </div>
          ) : squadError ? (
            <div className="basketball-state basketball-error">
              <span>!</span>
              <h3>Unable to load squad</h3>
              <p>{squadError}</p>
            </div>
          ) : !squadLoaded ? (
            <div className="basketball-state">
              <span>🏀</span>
              <h3>Ready to explore the squad?</h3>
              <p>
                Select a season and click Load Squad to view the players.
              </p>
            </div>
          ) : players.length === 0 ? (
            <div className="basketball-state">
              <span>⌕</span>
              <h3>No players found</h3>
              <p>
                No squad information is currently available for this team
                and season.
              </p>
            </div>
          ) : (
            <div className="basketball-player-directory-grid">
              {players.map((item) => (
                <button
                  className="basketball-player-directory-card"
                  key={item.id}
                  onClick={() => openPlayer(item)}
                >
                  <div className="basketball-player-number">
                    {item.number || "—"}
                  </div>

                  <div className="basketball-player-info">
                    <h3>{item.name || "Unknown player"}</h3>
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
          )}
        </section>
      </div>
    </main>
  );
}

export default BasketballTeamDetailsPage;
