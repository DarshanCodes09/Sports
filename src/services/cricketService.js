
import { DEFAULT_CACHE_TTL, requestJson } from "./requestManager";

const API_BASE = "http://localhost:5000/api";

async function apiRequest(endpoint) {
  return requestJson(`${API_BASE}${endpoint}`);
}

// Search players by name
export async function searchPlayers(query) {
  const result = await apiRequest(
    `/players?q=${encodeURIComponent(query)}`
  );

  return result.data || [];
}

// Get players by country/team, with pagination
export async function getPlayersByTeam(teamId, page = 1, cursor = null) {
  const params = new URLSearchParams({
    team: teamId,
    limit: "50",
  });

  if (cursor) {
    params.set("cursor", cursor);
  } else {
    params.set("page", String(page));
  }

  const result = await apiRequest(`/players?${params.toString()}`);

  return {
    players: result.data || [],
    meta: result.meta || {},
  };
}

// Get a player's profile
export async function getPlayerProfile(playerId) {
  const result = await apiRequest(
    `/players/${encodeURIComponent(playerId)}`
  );

  return result.data;
}

// player  career stats
export async function getPlayerStats(playerId) {
  const result = await apiRequest(
    `/players/${encodeURIComponent(playerId)}/stats`
  );

  return result.data;
}


// for printing  all teams
export async function getTeams() {
  const result = await requestJson(`${API_BASE}/teams`, {
    cacheTtl: DEFAULT_CACHE_TTL,
  });

  return result.data || [];
}

// Get team details
export async function getTeamDetails(teamId) {
  const result = await apiRequest(
    `/teams/${encodeURIComponent(teamId)}`
  );

  return result.data;
}

//leauges
export async function getCompetitionSeasons(competitionId) {
  const result = await apiRequest(
    `/competitions/${encodeURIComponent(competitionId)}/seasons`
  );

  return result.data;
}

export async function getCompetitionSeason(competitionId, season) {
  const result = await apiRequest(
    `/competitions/${encodeURIComponent(competitionId)}/seasons/${encodeURIComponent(season)}`
  );

  return result.data;
}

// Get all competitions
export async function getCompetitions() {
  const result = await requestJson(`${API_BASE}/competitions`, {
    cacheTtl: DEFAULT_CACHE_TTL,
  });

  // Your actual competitions response has data.data as an array
  return result.data?.data || [];
}

// Get competition details
export async function getCompetitionDetails(competitionId) {
  const result = await apiRequest(
    `/competitions/${encodeURIComponent(competitionId)}`
  );

  return result.data;
}
//scorecard 
export async function getMatchScorecard(matchId) {
  const result = await apiRequest(
    `/matches/${encodeURIComponent(matchId)}/scorecard`
  );

  return result.data;
}
