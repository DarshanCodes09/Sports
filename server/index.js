
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
const API_BASE = "https://api.cricketdatabase.com/v1";

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

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error?.message ||
      result.message ||
      `Cricket API error: ${response.status}`
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

app.listen(PORT, () => {
  console.log(`STRIVORA server running at http://localhost:${PORT}`);
});
