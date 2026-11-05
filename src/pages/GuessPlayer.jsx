import React, { useState, useEffect } from "react";
import { players } from "../data/players.js";
import { saveGameResult } from "../utils/arenaStorage.js";
import "../styles/GuessPlayer.css";

// Shuffle array items randomly
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[randomIndex];
    shuffled[randomIndex] = temp;
  }
  return shuffled;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];

const SPORTS = [
  { label: "All Sports", value: "All" },
  { label: "Cricket", value: "Cricket" },
  { label: "Football", value: "Football" },
  { label: "Basketball", value: "Basketball" },
  { label: "Volleyball", value: "Volleyball" }
];

// Points awarded based on how few clues were needed
function getPoints(clueCount) {
  if (clueCount === 1) return 100;
  if (clueCount === 2) return 75;
  if (clueCount === 3) return 50;
  return 25;
}

function GuessPlayer() {
  const [selectedSport, setSelectedSport] = useState("All");
  const [gameState, setGameState] = useState("setup");

  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [revealedClueCount, setRevealedClueCount] = useState(1);

  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);

  // Filter players by selected sport
  const availablePlayers =
    selectedSport === "All"
      ? players
      : players.filter((p) => p.sport === selectedSport);

  // Start a new 10-player scouting challenge
  const handleStartGame = () => {
    if (availablePlayers.length === 0) return;

    const shuffledPool = shuffleArray(availablePlayers);
    const chosenPlayers = shuffledPool.slice(0, 10).map((player) => ({
      ...player,
      shuffledOptions: shuffleArray(player.options)
    }));

    setGameQuestions(chosenPlayers);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setTimeLeft(20);
    setRevealedClueCount(1);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setUnansweredCount(0);
    setGameState("playing");
  };

  // 20-second countdown timer
  useEffect(() => {
    if (gameState !== "playing" || isLocked) return;

    if (timeLeft === 0) {
      setIsLocked(true);
      setUnansweredCount((prev) => prev + 1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isLocked, timeLeft]);

  const currentQuestion = gameQuestions[currentIndex];

  // Reveal next clue
  const handleRevealClue = () => {
    if (!currentQuestion || isLocked) return;
    if (revealedClueCount < currentQuestion.clues.length) {
      setRevealedClueCount((prev) => prev + 1);
    }
  };

  // Handle answer selection
  const handleSelectOption = (option) => {
    if (isLocked) return;

    setSelectedAnswer(option);
    setIsLocked(true);

    if (option === currentQuestion.answer) {
      const points = getPoints(revealedClueCount);
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  // Move to next player or view results
  const handleNextPlayer = () => {
    if (currentIndex + 1 < gameQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
      setTimeLeft(20);
      setRevealedClueCount(1);
    } else {
      saveGameResult({
        gameName: "Guess the Player",
        score,
        correctCount,
        wrongCount: incorrectCount + unansweredCount,
        xpEarned: score
      });
      setGameState("results");
    }
  };

  const handlePlayAgain = () => {
    setGameState("setup");
  };

  // Performance rating message for results screen
  const getPerformanceMessage = () => {
    if (gameQuestions.length === 0) return "";
    const percentage = (correctCount / gameQuestions.length) * 100;
    if (percentage >= 80) return "Master Scout - Legendary Sports Knowledge!";
    if (percentage >= 50) return "Pro Analyst - Impressive Player Recognition!";
    return "Rookie Scout - Keep Practicing to Spot the Legends!";
  };

  let feedbackTitle = "";
  let feedbackType = "";
  if (currentQuestion && isLocked) {
    if (selectedAnswer === currentQuestion.answer) {
      feedbackTitle = `Correct! You identified ${currentQuestion.answer} (+${getPoints(revealedClueCount)} pts)`;
      feedbackType = "correct";
    } else if (selectedAnswer === null) {
      feedbackTitle = `Time's up! The mystery athlete was: ${currentQuestion.answer}`;
      feedbackType = "timeout";
    } else {
      feedbackTitle = `Incorrect! The mystery athlete was: ${currentQuestion.answer}`;
      feedbackType = "incorrect";
    }
  }

  return (
    <div className="player-wrapper">
      <div className="player-container">
        {/* Setup Screen */}
        {gameState === "setup" && (
          <div className="player-setup-card">
            <header className="player-setup-header">
              <p className="player-badge">SPORTSVERSE ARENA</p>
              <h1 className="player-title">GUESS THE PLAYER</h1>
              <p className="player-subtitle">
                Put your sports scouting skills to the test! Read progressive career clues and identify famous athletes before time runs out.
              </p>
            </header>

            <div className="player-section-label">Select Category</div>
            <div className="player-categories-grid">
              {SPORTS.map((sportItem) => (
                <button
                  key={sportItem.value}
                  type="button"
                  className={`player-category-btn ${selectedSport === sportItem.value ? "active" : ""}`}
                  onClick={() => setSelectedSport(sportItem.value)}
                >
                  {sportItem.label}
                </button>
              ))}
            </div>

            <div className="player-rules-card">
              <h2 className="player-rules-heading">Scouting Rules & Scoring</h2>
              <ul className="player-rules-list">
                <li className="player-rules-item">
                  <span className="player-rule-bullet">-</span>
                  <span>Clues are revealed one by one (nationality, position, club, milestones).</span>
                </li>
                <li className="player-rules-item">
                  <span className="player-rule-bullet">-</span>
                  <span><strong>Fewer clues = Higher score:</strong> 1 clue (100 pts) | 2 clues (75 pts) | 3 clues (50 pts) | 4 clues (25 pts).</span>
                </li>
                <li className="player-rules-item">
                  <span className="player-rule-bullet">-</span>
                  <span>You have <strong>20 seconds</strong> per athlete to make your guess.</span>
                </li>
                <li className="player-rules-item">
                  <span className="player-rule-bullet">-</span>
                  <span>Players and answer choices are randomized every game.</span>
                </li>
              </ul>
            </div>

            {availablePlayers.length > 0 ? (
              <div className="player-info-banner">
                Ready! <strong>{availablePlayers.length} athletes</strong> available for{" "}
                <strong>{selectedSport === "All" ? "All Sports" : selectedSport}</strong>.
              </div>
            ) : (
              <div className="player-info-banner warning">
                No player profiles found for this category. Please select another sport.
              </div>
            )}

            <div className="player-setup-actions">
              <a href="/arena" className="player-btn-secondary">
                Back to Arena
              </a>
              <button
                type="button"
                className="player-btn-primary"
                onClick={handleStartGame}
                disabled={availablePlayers.length === 0}
              >
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Playing Screen */}
        {gameState === "playing" && currentQuestion && (
          <div className="player-play-card">
            <div className="player-top-bar">
              <div className="player-meta-info">
                <span className="player-tag">{currentQuestion.sport}</span>
                <span className="player-tag">
                  Player {currentIndex + 1} of {gameQuestions.length}
                </span>
              </div>
              <div className={`player-timer-pill ${timeLeft <= 5 ? "urgent" : ""}`}>
                {timeLeft}s
              </div>
            </div>

            <div className="player-progress-bar-bg">
              <span
                className="player-progress-bar-fill"
                style={{
                  width: `${((currentIndex + 1) / gameQuestions.length) * 100}%`
                }}
              ></span>
            </div>

            <div className="player-clues-section">
              <div className="player-clues-header">
                <h2 className="player-clues-title">Scouting Clues:</h2>
                {!isLocked && (
                  <span className="player-points-tag">
                    Worth: {getPoints(revealedClueCount)} pts
                  </span>
                )}
              </div>

              <div className="player-clues-list">
                {currentQuestion.clues.slice(0, revealedClueCount).map((clue, idx) => (
                  <div key={idx} className="player-clue-card">
                    <span className="player-clue-num">Clue {idx + 1}</span>
                    <span>{clue}</span>
                  </div>
                ))}
              </div>

              {!isLocked && revealedClueCount < currentQuestion.clues.length && (
                <button
                  type="button"
                  className="player-reveal-btn"
                  onClick={handleRevealClue}
                >
                  Reveal Clue {revealedClueCount + 1} of {currentQuestion.clues.length}
                </button>
              )}
            </div>

            <div className="player-options-grid">
              {currentQuestion.shuffledOptions.map((option, index) => {
                let statusClass = "";
                if (isLocked) {
                  if (option === currentQuestion.answer) {
                    statusClass = "correct";
                  } else if (option === selectedAnswer) {
                    statusClass = "incorrect";
                  }
                }

                return (
                  <button
                    key={option}
                    type="button"
                    className={`player-option-btn ${statusClass}`}
                    onClick={() => handleSelectOption(option)}
                    disabled={isLocked}
                  >
                    <span className="player-option-letter">
                      {OPTION_LETTERS[index]}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {isLocked && (
              <div className={`player-feedback-box ${feedbackType}`}>
                <div className="player-feedback-title">{feedbackTitle}</div>
                <p className="player-feedback-text">
                  <strong>Career Profile:</strong> {currentQuestion.explanation} ({currentQuestion.role}, {currentQuestion.nationality})
                </p>
                {currentQuestion.source && (
                  <p className="player-source-text">
                    <em>Source: {currentQuestion.source}</em>
                  </p>
                )}
              </div>
            )}

            {isLocked && (
              <div className="player-bottom-actions">
                <button
                  type="button"
                  className="player-btn-primary"
                  onClick={handleNextPlayer}
                >
                  {currentIndex + 1 < gameQuestions.length
                    ? "Next Player"
                    : "View Results"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Screen */}
        {gameState === "results" && (
          <div className="player-results-card">
            <h1 className="player-results-title">Scouting Challenge Completed!</h1>
            <p className="player-results-meta">
              Category: <strong>{selectedSport === "All" ? "All Sports" : selectedSport}</strong> | Total Athletes: <strong>{gameQuestions.length}</strong>
            </p>

            <div className="player-score-circle">
              <span className="player-score-number">{score}</span>
              <span className="player-score-label">Total Points</span>
            </div>

            <div className="player-performance-badge">{getPerformanceMessage()}</div>

            <div className="player-stats-grid">
              <div className="player-stat-card">
                <div className="player-stat-label">Correct Guesses</div>
                <div className="player-stat-value correct">{correctCount}</div>
              </div>
              <div className="player-stat-card">
                <div className="player-stat-label">Incorrect Guesses</div>
                <div className="player-stat-value incorrect">{incorrectCount}</div>
              </div>
              <div className="player-stat-card">
                <div className="player-stat-label">Unanswered</div>
                <div className="player-stat-value unanswered">{unansweredCount}</div>
              </div>
            </div>

            <div className="player-results-actions">
              <button
                type="button"
                className="player-btn-primary"
                onClick={handlePlayAgain}
              >
                Play Again
              </button>
              <a href="/arena" className="player-btn-secondary">
                Back to Arena
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuessPlayer;
