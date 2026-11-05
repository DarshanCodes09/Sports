import { API_BASE_URL } from "./api";
import { DEFAULT_CACHE_TTL, requestJson } from "./requestManager";

const API_BASE = `${API_BASE_URL}/basketball`;

async function basketballRequest(endpoint) {
  return requestJson(`${API_BASE}${endpoint}`);
}

export async function getBasketballCountries() {
  const result = await requestJson(`${API_BASE}/countries`, {
    cacheTtl: DEFAULT_CACHE_TTL,
  });
  return result.response || [];
}

export async function getBasketballTeams(params = {}) {
  const query = new URLSearchParams(params);
  const result = await basketballRequest(`/teams?${query.toString()}`);
  return result.response || [];
}

export async function getBasketballLeagues(params = {}) {
  const query = new URLSearchParams(params);
  const result = await requestJson(`${API_BASE}/leagues?${query.toString()}`, {
    cacheTtl: DEFAULT_CACHE_TTL,
  });
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
