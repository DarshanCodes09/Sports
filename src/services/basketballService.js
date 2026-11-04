const API_BASE = "http://localhost:5000/api/basketball";

async function basketballRequest(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Basketball API request failed");
  }

  return result;
}

export async function getBasketballCountries() {
  const result = await basketballRequest("/countries");
  return result.response || [];
}

export async function getBasketballTeams(params = {}) {
  const query = new URLSearchParams(params);
  const result = await basketballRequest(`/teams?${query.toString()}`);
  return result.response || [];
}

export async function getBasketballLeagues(params = {}) {
  const query = new URLSearchParams(params);
  const result = await basketballRequest(`/leagues?${query.toString()}`);
  return result.response || [];
}
export async function getBasketballStandings(params = {}) {
  const query = new URLSearchParams(params);
  const result = await basketballRequest(`/standings?${query.toString()}`);

  return result.response || [];
}
export async function getBasketballPlayers(params = {}) {
  const query = new URLSearchParams(params);
  const result = await basketballRequest(`/players?${query.toString()}`);

  return result.response || [];
}
export async function getBasketballPlayerStatistics(params = {}) {
  const query = new URLSearchParams(params);

  const result = await basketballRequest(
    `/player-statistics?${query.toString()}`
  );

  return result.response || [];
}