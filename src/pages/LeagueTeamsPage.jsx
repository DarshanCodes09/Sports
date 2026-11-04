
import React, { useEffect, useState } from "react";
import {
  getCompetitionDetails,
  getCompetitionSeasons,
  getCompetitionSeason,
} from "../services/cricketService";

export default function LeagueTeamsPage() {
  const leagueId = window.location.pathname.split("/")[2];

  const [league, setLeague] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seasonLoading, setSeasonLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLeague() {
      try {
        const [details, seasonResult] = await Promise.all([
          getCompetitionDetails(leagueId),
          getCompetitionSeasons(leagueId),
        ]);

        setLeague(details);

        const seasonList = seasonResult?.seasons || [];
        setSeasons(seasonList);

        if (seasonList.length > 0) {
          setSelectedSeason(seasonList[0].season);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeague();
  }, [leagueId]);

  useEffect(() => {
    if (!selectedSeason) return;

    async function loadSeason() {
      try {
        setSeasonLoading(true);
        const data = await getCompetitionSeason(leagueId, selectedSeason);
        setSeasonData(data);
      } catch (err) {
        console.error("Season details error:", err.message);
        setSeasonData(null);
      } finally {
        setSeasonLoading(false);
      }
    }

    loadSeason();
  }, [leagueId, selectedSeason]);

  if (loading) return <p>Loading league details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!league) return <p>League not found.</p>;

  function showPlayers(players, type) {
    if (!players?.length) return <p>No player records available.</p>;

    return (
      <div className="player-list">
        {players.map((player, index) => (
          <button
            className="player-item"
            key={player.player || index}
            onClick={() => {
              if (player.player) {
                window.location.href = `/players/${player.player}`;
              }
            }}
          >
            <strong>{index + 1}. {player.name || player.player}</strong>
            <span>
              {type === "runs"
                ? `${player.runs} runs`
                : `${player.wickets} wickets`}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <main>
      <button onClick={() => window.history.back()}>Back</button>

      <h1>{league.name || league.competition}</h1>

      <h2>Competition Details</h2>
      <p>Country: {league.country || "N/A"}</p>
      <p>Type: {league.kind || "N/A"}</p>
      <p>Total Matches: {league.matches || 0}</p>

      <h2>All-time Most Runs</h2>
      {showPlayers(league.most_runs, "runs")}

      <h2>All-time Most Wickets</h2>
      {showPlayers(league.most_wickets, "wickets")}

      <h2>Season-wise Records</h2>

      {seasons.length > 0 ? (
        <>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            {seasons.map((season) => (
              <option key={season.season} value={season.season}>
                {season.season}
              </option>
            ))}
          </select>

          {seasonLoading ? (
            <p>Loading season...</p>
          ) : seasonData ? (
            <>
              <h3>{selectedSeason} Season</h3>
              <p>Champion: {seasonData.champion || "N/A"}</p>

              <h3>Points Table</h3>
              {seasonData.table?.length ? (
                seasonData.table.map((team, index) => (
                  <p key={team.team || index}>
                    {team.team || team.name}: Played {team.played},
                    Won {team.won}, Lost {team.lost}
                  </p>
                ))
              ) : (
                <p>No points table available.</p>
              )}

              <h3>Season Most Runs</h3>
              {showPlayers(seasonData.most_runs, "runs")}

              <h3>Season Most Wickets</h3>
              {showPlayers(seasonData.most_wickets, "wickets")}

              <h3>Match Results</h3>
              {seasonData.results?.length ? (
                seasonData.results.map((match, index) => (
                  <p key={match.match || index}>
                    
                {match.date || "Date N/A"} — {match.teams?.map((team, index) => (
                <span key={index}>
                    {team.name} ({team.score || "No score"})
                    {team.won ? " 🏆" : ""}
                    {index === 0 ? " vs " : ""}
                </span>
                ))}
                {" — "}
                {match.result || "Result unavailable"}

                  </p>
                ))
              ) : (
                <p>No match results available.</p>
              )}
            </>
          ) : (
            <p>Season details could not be loaded.</p>
          )}
        </>
      ) : (
        <p>Season information is not available for this competition.</p>
      )}
    </main>
  );
}
