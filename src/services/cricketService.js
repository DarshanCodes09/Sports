
const API_BASE = "http://localhost:5000/api";

async function apiRequest(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Something went wrong");
  }

  return result;
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
  const result = await apiRequest("/teams");
  return result.data?.data || [];
}

// Get team details
export async function getTeamDetails(teamId) {
  const result = await apiRequest(
    `/teams/${encodeURIComponent(teamId)}`
  );

  return result.data;
}

// Get all competitions
export async function getCompetitions() {
  const result = await apiRequest("/competitions");

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
