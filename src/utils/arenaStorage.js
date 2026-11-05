// LocalStorage utility for STRIVORA Sports Arena

const STORAGE_KEY = "strivora_arena_data";

// Default data structure if nothing is in LocalStorage yet
const defaultData = {
  totalXp: 0,
  gamesPlayed: 0,
  totalCorrect: 0,
  totalWrong: 0,
  bestScores: {
    "Sports Quiz": 0,
    "Flag Challenge": 0,
    "Guess the Player": 0,
    "Stats Challenge": 0
  },
  history: []
};

// Load saved arena data from LocalStorage
export function getArenaData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return {
      totalXp: parsed.totalXp || 0,
      gamesPlayed: parsed.gamesPlayed || 0,
      totalCorrect: parsed.totalCorrect || 0,
      totalWrong: parsed.totalWrong || 0,
      bestScores: {
        ...defaultData.bestScores,
        ...(parsed.bestScores || {})
      },
      history: Array.isArray(parsed.history) ? parsed.history : []
    };
  } catch (error) {
    console.error("Failed to read from LocalStorage:", error);
    return defaultData;
  }
}

// Save a completed game result
export function saveGameResult({ gameName, score, correctCount, wrongCount, xpEarned }) {
  try {
    const current = getArenaData();

    const xpToAdd = xpEarned !== undefined ? xpEarned : score * 10;
    const newTotalXp = current.totalXp + xpToAdd;
    const newGamesPlayed = current.gamesPlayed + 1;
    const newTotalCorrect = current.totalCorrect + (correctCount || 0);
    const newTotalWrong = current.totalWrong + (wrongCount || 0);

    // Update best score for this specific game
    const currentBest = current.bestScores[gameName] || 0;
    const updatedBestScores = {
      ...current.bestScores,
      [gameName]: Math.max(currentBest, score)
    };

    // Add entry to history (most recent first, keep up to 10 entries)
    const newHistoryItem = {
      id: Date.now(),
      gameName,
      score,
      xpEarned: xpToAdd,
      date: new Date().toLocaleDateString()
    };
    const updatedHistory = [newHistoryItem, ...current.history].slice(0, 10);

    const updatedData = {
      totalXp: newTotalXp,
      gamesPlayed: newGamesPlayed,
      totalCorrect: newTotalCorrect,
      totalWrong: newTotalWrong,
      bestScores: updatedBestScores,
      history: updatedHistory
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return updatedData;
  } catch (error) {
    console.error("Failed to save to LocalStorage:", error);
    return getArenaData();
  }
}

