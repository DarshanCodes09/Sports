
import React, { useEffect, useState } from "react";
import {
  getFootballTeamDetails,
  getFootballSquad,
} from "../services/footballService";
import "../styles/Football.css";

function FootballTeamDetailsPage() {
  const id = window.location.pathname.split("/")[3];

  const [team, setTeam] = useState(null);
  const [venue, setVenue] = useState(null);
  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [squadLoading, setSquadLoading] = useState(false);
  const [squadRequested, setSquadRequested] = useState(false);

  const [error, setError] = useState("");
  const [squadError, setSquadError] = useState("");

  useEffect(() => {
    let active = true;

    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const teamData = await getFootballTeamDetails(id);

        if (!active) return;

        if (!Array.isArray(teamData) || teamData.length === 0) {
          setError("Team not found.");
          return;
        }

        setTeam(teamData[0].team);
        setVenue(teamData[0].venue);
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load team profile.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      active = false;
    };
  }, [id]);

  const loadSquad = async () => {
    try {
      setSquadLoading(true);
      setSquadRequested(true);
      setSquadError("");

      const squadData = await getFootballSquad(id);

      setPlayers(squadData?.[0]?.players || []);
    } catch (err) {
      setSquadError(err.message || "Unable to load the team squad.");
    } finally {
      setSquadLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="football-library-page">
        <div className="football-page-container">
          <div className="football-state">
            <div className="football-loader" />
            <h3>Loading team profile</h3>
            <p>Gathering team and stadium information...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !team) {
    return (
      <main className="football-library-page">
        <div className="football-page-container">
          <div className="football-state football-error">
            <h3>Team profile unavailable</h3>
            <p>{error || "Team not found."}</p>
            <button
              className="football-back-button"
              onClick={() => window.history.back()}
            >
              Back to Teams
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="football-library-page">
      <div className="football-page-container">

        <div className="football-breadcrumb">
          <span>Sports</span>
          <span>/</span>
          <span>Football</span>
          <span>/</span>
          <span>Teams</span>
          <span>/</span>
          <strong>{team.name}</strong>
        </div>

        <button
          className="football-back-button"
          onClick={() => window.history.back()}
        >
          ← Back to Teams
        </button>

        {/* TEAM PROFILE */}

        <section className="football-team-profile-hero">
          <div className="football-team-profile-logo">
            {team.logo ? (
              <img src={team.logo} alt={`${team.name} logo`} />
            ) : (
              <span>⚽</span>
            )}
          </div>

          <div className="football-team-profile-content">
            <span className="football-eyebrow">TEAM PROFILE</span>
            <h1>{team.name}</h1>

            <p className="football-team-country">
              {team.country || "Country unavailable"}
            </p>

            <div className="football-team-profile-tags">
              <span>Founded: {team.founded ?? "N/A"}</span>
              <span>
                {team.national ? "National Team" : "Club Team"}
              </span>
            </div>
          </div>

          <div className="football-team-profile-watermark" aria-hidden="true">
            ⚽
          </div>
        </section>

        {/* STADIUM INFORMATION */}

        <section className="football-detail-section">
          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">HOME GROUND</span>
              <h2>Stadium Information</h2>
              <p>Explore the venue associated with this team.</p>
            </div>
          </div>

          <div className="football-venue-card">
            <div className="football-venue-image">
              {venue?.image ? (
                <img src={venue.image} alt={venue.name || "Stadium"} />
              ) : (
                <span>🏟️</span>
              )}
            </div>

            <div className="football-venue-content">
              <span className="football-eyebrow">TEAM STADIUM</span>
              <h3>{venue?.name || "Venue information unavailable"}</h3>

              <div className="football-venue-details">
                <div>
                  <span>City</span>
                  <strong>{venue?.city || "N/A"}</strong>
                </div>

                <div>
                  <span>Capacity</span>
                  <strong>
                    {venue?.capacity != null
                      ? venue.capacity.toLocaleString()
                      : "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Address</span>
                  <strong>{venue?.address || "N/A"}</strong>
                </div>

                <div>
                  <span>Surface</span>
                  <strong>{venue?.surface || "N/A"}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SQUAD */}

        <section className="football-detail-section">
          <div className="football-section-heading">
            <div>
              <span className="football-eyebrow">THE PLAYING SQUAD</span>
              <h2>Team Squad</h2>
              <p>Discover the players representing this team.</p>
            </div>

            <span className="football-result-count">
              {squadRequested && !squadLoading
                ? `${players.length} players`
                : "Squad"}
            </span>
          </div>

          {!squadRequested && (
            <div className="football-squad-intro">
              <div>
                <h3>Meet the squad</h3>
                <p>
                  Load the squad to explore player names,
                  positions, ages and jersey numbers.
                </p>
              </div>

              <button
                className="football-squad-load-button"
                onClick={loadSquad}
                disabled={squadLoading}
              >
                Load Squad <span>↗</span>
              </button>
            </div>
          )}

          {squadLoading && (
            <div className="football-state">
              <div className="football-loader" />
              <h3>Loading squad</h3>
              <p>Fetching the team's player information...</p>
            </div>
          )}

          {!squadLoading && squadError && (
            <div className="football-state football-error">
              <h3>Unable to load squad</h3>
              <p>{squadError}</p>
              <button
                className="football-squad-load-button"
                onClick={loadSquad}
              >
                Try Again
              </button>
            </div>
          )}

          {!squadLoading &&
            squadRequested &&
            !squadError &&
            players.length === 0 && (
              <div className="football-state">
                <h3>No squad information available</h3>
                <p>There are no player records available for this team.</p>
              </div>
            )}

          {!squadLoading && players.length > 0 && (
            <div className="football-squad-directory">
              {players.map((item, index) => (
                <article
                  className="football-squad-player-card"
                  key={item.id || index}
                >
                  <div className="football-squad-player-photo">
                    {item.photo ? (
                      <img src={item.photo} alt={item.name} />
                    ) : (
                      <span>⚽</span>
                    )}
                  </div>

                  <div className="football-squad-player-info">
                    <h3>{item.name || "Unknown player"}</h3>
                    <p>{item.position || "Position unavailable"}</p>

                    <div className="football-squad-player-meta">
                      <span>Age: {item.age ?? "N/A"}</span>
                      <span>Number: {item.number ?? "N/A"}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default FootballTeamDetailsPage;
