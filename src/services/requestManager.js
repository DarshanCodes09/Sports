const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

const cache = new Map();
const inFlight = new Map();

function getCacheKey(url) {
  return url;
}

function getRetryAfter(response) {
  const retryAfter = response.headers.get("Retry-After");

  if (!retryAfter) return "";

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds)) {
    return ` Try again in ${seconds} seconds.`;
  }

  return ` Try again after ${retryAfter}.`;
}

async function fetchJson(url) {
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error("API unavailable. Please try again later.");
  }

  let result;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(`API rate limit reached.${getRetryAfter(response)}`);
    }

    throw new Error(
      result?.error || result?.message || `API request failed (${response.status}).`,
    );
  }

  if (result === null) {
    throw new Error(
      "Backend API is not connected. Set VITE_API_BASE_URL to your deployed backend server URL.",
    );
  }

  return result;
}

export function requestJson(
  url,
  { cacheTtl = 0, forceRefresh = false } = {},
) {
  const cacheKey = getCacheKey(url);
  const cached = cache.get(cacheKey);

  if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
    return Promise.resolve(cached.value);
  }

  if (inFlight.has(cacheKey)) {
    return inFlight.get(cacheKey);
  }

  const request = fetchJson(url)
    .then((value) => {
      if (cacheTtl > 0) {
        cache.set(cacheKey, {
          value,
          expiresAt: Date.now() + cacheTtl,
        });
      }

      return value;
    })
    .finally(() => {
      inFlight.delete(cacheKey);
    });

  inFlight.set(cacheKey, request);
  return request;
}

export function clearRequestCache(url) {
  if (url) {
    cache.delete(getCacheKey(url));
    return;
  }

  cache.clear();
}

export function refreshRequest(url, options = {}) {
  clearRequestCache(url);
  return requestJson(url, { ...options, forceRefresh: true });
}

export { DEFAULT_CACHE_TTL };
