const API_URL = "http://localhost:5000/api/volleyball";

export async function getVolleyballCountries() {
  const response = await fetch(`${API_URL}/countries`);

  if (!response.ok) {
    throw new Error("Failed to fetch volleyball countries");
  }

  const data = await response.json();
  return data.response || [];
}

export async function getVolleyballLeagues(params = {}) {
  const query = new URLSearchParams(params);

  const response = await fetch(`${API_URL}/leagues?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch volleyball leagues");
  }

  const data = await response.json();
  return data.response || [];
}

export async function getVolleyballTeams(params = {}) {
  const query = new URLSearchParams(params);

  const response = await fetch(`${API_URL}/teams?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch volleyball teams");
  }

  const data = await response.json();
  return data.response || [];
}

export async function getVolleyballGames(params = {}) {
  const query = new URLSearchParams(params);

  const response = await fetch(`${API_URL}/games?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch volleyball games");
  }

  const data = await response.json();
  return data.response || [];
}

export async function getVolleyballStandings(params = {}) {
  const query = new URLSearchParams(params);

  const response = await fetch(`${API_URL}/standings?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch volleyball standings");
  }

  const data = await response.json();
  return data.response || [];
}