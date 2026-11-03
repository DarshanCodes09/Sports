import React, { useState, useEffect } from "react";
import { players } from "../data/players.js";
import "../styles/GuessPlayer.css";

// Reusable Fisher-Yates algorithm for unbiased array shuffling
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

// Option letters for display (A, B, C, D)
const OPTION_LETTERS = ["A", "B", "C", "D"];

// Points scale based on how many clues were revealed before guessing
function getPointsForClueCount(clueCount) {
  if (clueCount === 1) return 100;
  if (clueCount === 2) return 75;
  if (clueCount === 3) return 50;
  return 25;
}

function GuessPlayer() {
  // Game setup state
  const [selectedSport, setSelectedSport] = useState("All");
  const [gameState, setGameState] = useState("setup"); // "setup" | "playing" | "results"

  // Gameplay state
  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [revealedClueCount, setRevealedClueCount] = useState(1);

  // Score tracking state
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);

  // Filter available players by sport
  const availablePlayers = (players || []).filter((p) => {
    if (selectedSport === "All") return true;
    return p.sport === selectedSport;
  });

  // Start a fresh randomized Guess the Player game
  const handleStartGame = () => {
    if (availablePlayers.length === 0) return;

    // 1. Shuffle player pool with Fisher-Yates
    const shuffledPool = shuffleArray(availablePlayers);

    // 2. Select up to 10 players and shuffle their 4 answer choices
    const preparedQuestions = shuffledPool.slice(0, 10).map((player) => ({
      ...player,
      shuffledOptions: shuffleArray(player.options)
    }));

    // Reset gameplay and score states
    setGameQuestions(preparedQuestions);
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

  // 20-second countdown timer effect
  useEffect(() => {
    // Only count down while actively playing and current question is not locked
    if (gameState !== "playing" || isLocked) return;

    // If time expires, lock the question and mark as unanswered
    if (timeLeft === 0) {
      setIsLocked(true);
      setUnansweredCount((prev) => prev + 1);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Clean up timer on tick, question change, or component unmount
    return () => clearInterval(timerId);
  }, [gameState, isLocked, timeLeft]);

  // Current active player object
  const currentQuestion = gameQuestions[currentIndex];

  // Reveal next clue
  const handleRevealClue = () => {
    if (!currentQuestion || isLocked) return;
    if (revealedClueCount < currentQuestion.clues.length) {
      setRevealedClueCount((prev) => prev + 1);
    }
  };

  // Handles user clicking an answer option
  const handleSelectOption = (option) => {
    if (isLocked) return;

    setSelectedAnswer(option);
    setIsLocked(true);

    if (option === currentQuestion.answer) {
      const pointsEarned = getPointsForClueCount(revealedClueCount);
      setScore((prev) => prev + pointsEarned);
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  // Advance to next player or show results
  const handleNextPlayer = () => {
    if (currentIndex + 1 < gameQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
      setTimeLeft(20);
      setRevealedClueCount(1);
    } else {
      setGameState("results");
    }
  };

  // Return to setup screen
  const handlePlayAgain = () => {
    setGameState("setup");
  };

  // Calculate performance rating for results screen
  const getPerformanceMessage = () => {
    if (gameQuestions.length === 0) return "";
    const percentage = (correctCount / gameQuestions.length) * 100;
    if (percentage >= 80) return "🏆 Master Scout - Legendary Sports Knowledge!";
    if (percentage >= 50) return "⭐ Pro Analyst - Impressive Player Recognition!";
    return "🎯 Rookie Scout - Keep Practicing to Spot the Legends!";
  };

  return (
    <div className="player-wrapper">
      <div className="player-container">
        {/* ================================================================
            1. SETUP SCREEN
            ================================================================ */}
        {gameState === "setup" && (
          <div className="player-setup-card">
            <header className="player-setup-header">
              <p className="player-badge">STRIVORA GAMING ZONE</p>
              <h1 className="player-title">GUESS THE PLAYER</h1>
              <p className="player-subtitle">
                Put your sports scouting skills to the test! Read progressive career clues and identify famous athletes before time runs out.
              </p>
            </header>

            {/* Sport Selection */}
            <div className="player-section-label">Select Category</div>
            <div className="player-categories-grid">
              {[
                { label: "All Sports", value: "All" },
                { label: "🏏 Cricket", value: "Cricket" },
                { label: "⚽ Football", value: "Football" },
                { label: "🏀 Basketball", value: "Basketball" },
                { label: "🏐 Volleyball", value: "Volleyball" }
              ].map((sportItem) => (
                <button
                  key={sportItem.value}
                  type="button"
                  className={`player-category-btn ${
                    selectedSport === sportItem.value ? "active" : ""
                  }`}
                  onClick={() => setSelectedSport(sportItem.value)}
                >
                  {sportItem.label}
                </button>
              ))}
            </div>

            {/* Rules Card */}
            <div className="player-rules-card">
              <h2 className="player-rules-heading">📋 Scouting Rules & Scoring</h2>
              <ul className="player-rules-list">
                <li className="player-rules-item">
                  <span className="player-rule-bullet">&#9679;</span>
                  <span>Clues are revealed one by one (nationality, position, club, milestones).</span>
                </li>
                <li className="player-rules-item">
                  <span className="player-rule-bullet">&#9679;</span>
                  <span><strong>Fewer clues = Higher score:</strong> 1 clue (100 pts) &bull; 2 clues (75 pts) &bull; 3 clues (50 pts) &bull; 4 clues (25 pts).</span>
                </li>
                <li className="player-rules-item">
                  <span className="player-rule-bullet">&#9679;</span>
                  <span>You have <strong>20 seconds</strong> per athlete to make your guess.</span>
                </li>
                <li className="player-rules-item">
                  <span className="player-rule-bullet">&#9679;</span>
                  <span>Players and answer choices are randomized every game.</span>
                </li>
              </ul>
            </div>

            {/* Availability Banner */}
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

            {/* Setup Actions */}
            <div className="player-setup-actions">
              <a href="/arena" className="player-btn-secondary">
                &larr; Back to Arena
              </a>
              <button
                type="button"
                className="player-btn-primary"
                onClick={handleStartGame}
                disabled={availablePlayers.length === 0}
              >
                Start Game &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ================================================================
            2. PLAYING SCREEN
            ================================================================ */}
        {gameState === "playing" && currentQuestion && (
          <div className="player-play-card">
            {/* Top Bar: Progress and Timer */}
            <div className="player-top-bar">
              <div className="player-meta-info">
                <span className="player-tag">{currentQuestion.sport}</span>
                <span className="player-tag">
                  Player {currentIndex + 1} of {gameQuestions.length}
                </span>
              </div>
              <div className={`player-timer-pill ${timeLeft <= 5 ? "urgent" : ""}`}>
                ⏱ {timeLeft}s
              </div>
            </div>

            {/* Progress Bar */}
            <div className="player-progress-bar-bg">
              <span
                className="player-progress-bar-fill"
                style={{
                  width: `${((currentIndex + 1) / gameQuestions.length) * 100}%`
                }}
              ></span>
            </div>

            {/* Progressive Clues Section */}
            <div className="player-clues-section">
              <div className="player-clues-header">
                <h2 className="player-clues-title">🕵️ Scouting Clues:</h2>
                {!isLocked && (
                  <span className="player-points-tag">
                    Worth: {getPointsForClueCount(revealedClueCount)} pts
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

              {/* Reveal Next Clue Button */}
              {!isLocked && revealedClueCount < currentQuestion.clues.length && (
                <button
                  type="button"
                  className="player-reveal-btn"
                  onClick={handleRevealClue}
                >
                  🔍 Reveal Clue {revealedClueCount + 1} of {currentQuestion.clues.length}
                </button>
              )}
            </div>

            {/* 4 Player Options Grid */}
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

            {/* Answer Feedback Box */}
            {isLocked && (
              <div
                className={`player-feedback-box ${
                  selectedAnswer === currentQuestion.answer
                    ? "correct"
                    : selectedAnswer === null
                    ? "timeout"
                    : "incorrect"
                }`}
              >
                <div className="player-feedback-title">
                  {selectedAnswer === currentQuestion.answer &&
                    `✓ Correct! You identified ${currentQuestion.answer} (+${getPointsForClueCount(
                      revealedClueCount
                    )} pts)`}
                  {selectedAnswer !== null &&
                    selectedAnswer !== currentQuestion.answer &&
                    `✗ Incorrect! The mystery athlete was: ${currentQuestion.answer}`}
                  {selectedAnswer === null &&
                    `⏰ Time's up! The mystery athlete was: ${currentQuestion.answer}`}
                </div>
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

            {/* Next Player Button */}
            {isLocked && (
              <div className="player-bottom-actions">
                <button
                  type="button"
                  className="player-btn-primary"
                  onClick={handleNextPlayer}
                >
                  {currentIndex + 1 < gameQuestions.length
                    ? "Next Player →"
                    : "View Results →"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            3. RESULTS SCREEN
            ================================================================ */}
        {gameState === "results" && (
          <div className="player-results-card">
            <h1 className="player-results-title">Scouting Challenge Completed!</h1>
            <p className="player-results-meta">
              Category: <strong>{selectedSport === "All" ? "All Sports" : selectedSport}</strong> &bull; Total Athletes: <strong>{gameQuestions.length}</strong>
            </p>

            {/* Total Points Score Circle */}
            <div className="player-score-circle">
              <span className="player-score-number">{score}</span>
              <span className="player-score-label">Total Points</span>
            </div>

            {/* Performance Badge */}
            <div className="player-performance-badge">{getPerformanceMessage()}</div>

            {/* Detailed Stats Grid */}
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

            {/* Action Buttons */}
            <div className="player-results-actions">
              <button
                type="button"
                className="player-btn-primary"
                onClick={handlePlayAgain}
              >
                Play Again &#8635;
              </button>
              <a href="/arena" className="player-btn-secondary">
                Back to Arena &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuessPlayer;
