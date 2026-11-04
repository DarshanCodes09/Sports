
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
const API_BASE = "https://api.cricketdatabase.com/v1";
const FOOTBALL_API_BASE = "https://v3.football.api-sports.io";
const BASKETBALL_API_BASE = "https://v1.basketball.api-sports.io";

app.use(cors());
app.use(express.json());

// Reusable API request function

async function cricketRequest(endpoint) {
  if (!process.env.CRICKET_API_KEY) {
    throw new Error("CRICKET_API_KEY is missing from .env");
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.CRICKET_API_KEY}`,
      Accept: "application/json",
    },
  });

  const responseText = await response.text();

  let result;

  try {
    result = JSON.parse(responseText);
  } catch {
    result = { rawResponse: responseText };
  }

  if (!response.ok) {
    console.error("Cricket API response:", {
      endpoint,
      status: response.status,
      statusText: response.statusText,
      body: result,
    });

    throw new Error(
      `Cricket API error ${response.status}: ${
        result.error?.message ||
        result.message ||
        result.rawResponse ||
        response.statusText
      }`
    );
  }

  return result;
}

async function footballRequest(endpoint) {
  if (!process.env.FOOTBALL_API_KEY) {
    throw new Error("FOOTBALL_API_KEY is missing from .env");
  }

  const response = await fetch(`${FOOTBALL_API_BASE}${endpoint}`, {
    headers: {
      "x-apisports-key": process.env.FOOTBALL_API_KEY,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      `Football API error ${response.status}: ${
        result.message || response.statusText
      }`
    );
  }

  return result;
}

async function basketballRequest(endpoint) {
  if (!process.env.FOOTBALL_API_KEY) {
    throw new Error("FOOTBALL_API_KEY is missing from .env");
  }

  const response = await fetch(`${BASKETBALL_API_BASE}${endpoint}`, {
    headers: {
      "x-apisports-key": process.env.FOOTBALL_API_KEY,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      `Basketball API error ${response.status}: ${
        result.message || response.statusText
      }`
    );
  }

  return result;
}


// Server health check
app.get("/", (req, res) => {
  res.json({ message: "STRIVORA Cricket API is running!" });
});

// SEARCH PLAYERS
// Optional filters: q, team, gender, page, limit
app.get("/api/players", async (req, res) => {
  try {
    const params = new URLSearchParams();

    ["q", "team", "gender", "page", "limit", "cursor"].forEach((key) => {
      if (req.query[key]) {
        params.set(key, req.query[key]);
      }
    });

    const result = await cricketRequest(`/players?${params.toString()}`);
    res.json(result);
  } catch (error) {
    console.error("Players error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// PLAYER PROFILE
app.get("/api/players/:id", async (req, res) => {
  try {
    const result = await cricketRequest(
      `/players/${encodeURIComponent(req.params.id)}`
    );
    res.json(result);
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// PLAYER CAREER STATS
app.get("/api/players/:id/stats", async (req, res) => {
  try {
    const result = await cricketRequest(
      `/players/${encodeURIComponent(req.params.id)}/stats`
    );
    res.json(result);
  } catch (error) {
    console.error("Stats error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ALL TEAMS
app.get("/api/teams", async (req, res) => {
  try {
    const result = await cricketRequest("/teams");
    res.json(result);
  } catch (error) {
    console.error("Teams error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// INDIVIDUAL TEAM DETAILS
app.get("/api/teams/:id", async (req, res) => {
  try {
    const result = await cricketRequest(
      `/teams/${encodeURIComponent(req.params.id)}`
    );
    res.json(result);
  } catch (error) {
    console.error("Team details error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ALL COMPETITIONS / LEAGUES
app.get("/api/competitions", async (req, res) => {
  try {
    const result = await cricketRequest("/competitions");
    res.json(result);
  } catch (error) {
    console.error("Competitions error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// INDIVIDUAL COMPETITION DETAILS
app.get("/api/competitions/:id", async (req, res) => {
  try {
    const result = await cricketRequest(
      `/competitions/${encodeURIComponent(req.params.id)}`
    );
    res.json(result);
  } catch (error) {
    console.error("Competition details error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/competitions/:id/seasons", async (req, res) => {
  try {
    const result = await cricketRequest(
      `/competitions/${encodeURIComponent(req.params.id)}/seasons`
    );

    res.json(result);
  } catch (error) {
    console.error("Seasons API error:", error);
    res.status(500).json({
      error: error.message,
      details: error.response?.data || null,
      status: error.response?.status || null,
    });
  }
});

app.get("/api/competitions/:id/seasons/:season", async (req, res) => {
  try {
    const result = await cricketRequest(
      `/competitions/${encodeURIComponent(req.params.id)}/seasons/${encodeURIComponent(req.params.season)}`
    );

    res.json(result);
  } catch (error) {
    console.error("Season details error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/matches/:id/scorecard", async (req, res) => {
  try {
    const result = await cricketRequest(
      `/matches/${encodeURIComponent(req.params.id)}/scorecard`
    );

    res.json(result);
  } catch (error) {
    console.error("Scorecard error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// FOOTBALL COUNTRIES
app.get("/api/football/countries", async (req, res) => {
  try {
    const result = await footballRequest("/countries");
    res.json(result);
  } catch (error) {
    console.error("Football countries error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// FOOTBALL LEAGUES
app.get("/api/football/leagues", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await footballRequest(`/leagues?${params.toString()}`);
    res.json(result);
  } catch (error) {
    console.error("Football leagues error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// FOOTBALL TEAMS
app.get("/api/football/teams", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await footballRequest(`/teams?${params.toString()}`);
    res.json(result);
  } catch (error) {
    console.error("Football teams error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
//PLAYERS
app.get("/api/football/players", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await footballRequest(`/players?${params.toString()}`);
    res.json(result);
  } catch (error) {
    console.error("Football players error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/football/player-teams", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await footballRequest(
      `/players/teams?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Football player teams error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Football standings
app.get("/api/football/standings", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await footballRequest(
      `/standings?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Football standings error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
// Get team squad
app.get("/api/football/squads", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await footballRequest(
      `/players/squads?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Football squads error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//-------------Basketball------//
//countries//

app.get("/api/basketball/countries", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await basketballRequest(
      `/countries?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Basketball countries error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/basketball/teams", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await basketballRequest(
      `/teams?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Basketball teams error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/basketball/leagues", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await basketballRequest(
      `/leagues?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Basketball leagues error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/basketball/standings", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const result = await basketballRequest(
      `/standings?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Basketball standings error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/basketball/players", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);

    const result = await basketballRequest(
      `/players?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Basketball players error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/basketball/player-statistics", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);

    const result = await basketballRequest(
      `/games/statistics/players?${params.toString()}`
    );

    res.json(result);
  } catch (error) {
    console.error("Basketball player statistics error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const server = app.listen(PORT, () => {
  console.log(`STRIVORA server running at http://localhost:${PORT}`);
});

server.on("close", () => {
  console.log("Express server closed!");
});

server.on("error", (error) => {
  console.error("Server error:", error);
});
