import { API_BASE_URL } from "./api";
import { DEFAULT_CACHE_TTL, requestJson } from "./requestManager";

const API_URL = `${API_BASE_URL}/volleyball`;

export async function getVolleyballCountries() {
  const data = await requestJson(`${API_URL}/countries`, {
    cacheTtl: DEFAULT_CACHE_TTL,
  });
  return data.response || [];
}

export async function getVolleyballLeagues(params = {}) {
  const query = new URLSearchParams(params);

  const data = await requestJson(`${API_URL}/leagues?${query}`, {
    cacheTtl: DEFAULT_CACHE_TTL,
  });
  return data.response || [];
}

export async function getVolleyballTeams(params = {}) {
  const query = new URLSearchParams(params);

  const data = await requestJson(`${API_URL}/teams?${query}`);
  return data.response || [];
}

export async function getVolleyballGames(params = {}) {
  const query = new URLSearchParams(params);

  const data = await requestJson(`${API_URL}/games?${query}`);
  return data.response || [];
}

export async function getVolleyballStandings(params = {}) {
  const query = new URLSearchParams(params);

  const data = await requestJson(`${API_URL}/standings?${query}`);
  return data.response || [];
}
