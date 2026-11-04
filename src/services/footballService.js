const API_BASE = "http://localhost:5000/api/football";

// Reusable function to communicate with the backend
async function footballRequest(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Football API request failed");
  }

  return result;
}

// Get all football countries
export async function getFootballCountries() {
  const result = await footballRequest("/countries");
  return result.response || [];
}

// Get football leagues
export async function getFootballLeagues(params = {}) {
  const query = new URLSearchParams(params);
  const result = await footballRequest(`/leagues?${query.toString()}`);
  return result.response || [];
}

// Get football teams
export async function getFootballTeams(params = {}) {
  const query = new URLSearchParams(params);
  const result = await footballRequest(`/teams?${query.toString()}`);
  return result.response || [];
}
// Search football players
export async function getFootballPlayers(params = {}) {
  const query = new URLSearchParams(params);
  const result = await footballRequest(`/players?${query.toString()}`);
  return result.response || [];
}
// Get player profile and statistics
export async function getPlayerDetails(id, season = 2024) {
  const query = new URLSearchParams({
    id: id,
    season: season
  });

  const result = await footballRequest(`/players?${query.toString()}`);
  return result.response || [];
}
// Get player's club history
export async function getPlayerTeams(id) {
  const query = new URLSearchParams({
    player: id
  });

  const result = await footballRequest(`/player-teams?${query.toString()}`);
  return result.response || [];
}
// Get football standings
export async function getFootballStandings(params = {}) {
  const query = new URLSearchParams(params);
  const result = await footballRequest(`/standings?${query.toString()}`);
  return result.response || [];
}
// Get team details
export async function getFootballTeamDetails(id) {
  const query = new URLSearchParams({ id });
  const result = await footballRequest(`/teams?${query.toString()}`);
  return result.response || [];
}

// Get team squad
export async function getFootballSquad(id) {
  const query = new URLSearchParams({ team: id });
  const result = await footballRequest(`/squads?${query.toString()}`);
  return result.response || [];
}