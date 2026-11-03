import React, { useState, useEffect } from "react";
import { statistics } from "../data/statistics.js";
import "../styles/StatsChallenge.css";

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

function StatsChallenge() {
  // Game setup state
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [gameState, setGameState] = useState("setup"); // "setup" | "playing" | "results"

  // Gameplay state
  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  // Score tracking state
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);

  // Filter available questions based on selected sport and difficulty
  const availableQuestions = (statistics || []).filter((q) => {
    const matchesSport = selectedSport === "All" || q.sport === selectedSport;
    const matchesDifficulty = q.difficulty === selectedDifficulty;
    return matchesSport && matchesDifficulty;
  });

  // Start a fresh randomized Stats Challenge session
  const handleStartChallenge = () => {
    if (availableQuestions.length === 0) return;

    // 1. Shuffle filtered questions with Fisher-Yates
    const shuffledPool = shuffleArray(availableQuestions);

    // 2. Take up to 10 questions and shuffle their 4 answer choices individually
    const preparedQuestions = shuffledPool.slice(0, 10).map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options)
    }));

    // Reset gameplay and score states
    setGameQuestions(preparedQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setTimeLeft(15);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setUnansweredCount(0);
    setGameState("playing");
  };

  // 15-second countdown timer effect
  useEffect(() => {
    // Only count down while actively playing and question is not locked
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

    // Clean up timer on next tick, question change, or component unmount
    return () => clearInterval(timerId);
  }, [gameState, isLocked, timeLeft]);

  // Current active question
  const currentQuestion = gameQuestions[currentIndex];

  // Handles user clicking an answer option
  const handleSelectOption = (option) => {
    if (isLocked) return;

    setSelectedAnswer(option);
    setIsLocked(true);

    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  // Advance to next question or show results
  const handleNextQuestion = () => {
    if (currentIndex + 1 < gameQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
      setTimeLeft(15);
    } else {
      setGameState("results");
    }
  };

  // Return to setup screen
  const handlePlayAgain = () => {
    setGameState("setup");
  };

  // Accuracy calculation for results screen
  const calculateAccuracy = () => {
    if (gameQuestions.length === 0) return 0;
    return Math.round((correctCount / gameQuestions.length) * 100);
  };

  return (
    <div className="stats-wrapper">
      <div className="stats-container">
        {/* ================================================================
            1. SETUP SCREEN
            ================================================================ */}
        {gameState === "setup" && (
          <div className="stats-setup-card">
            <header className="stats-setup-header">
              <p className="stats-badge">STRIVORA GAMING ZONE</p>
              <h1 className="stats-title">STATS CHALLENGE</h1>
              <p className="stats-subtitle">
                Test your knowledge of sports milestones, historical records, and world-class statistics across cricket, football, basketball, and volleyball.
              </p>
            </header>

            {/* Sport Selection */}
            <div className="stats-section-label">Select Sport</div>
            <div className="stats-options-grid">
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
                  className={`stats-choice-btn ${
                    selectedSport === sportItem.value ? "active" : ""
                  }`}
                  onClick={() => setSelectedSport(sportItem.value)}
                >
                  {sportItem.label}
                </button>
              ))}
            </div>

            {/* Difficulty Selection */}
            <div className="stats-section-label">Select Difficulty</div>
            <div className="stats-options-grid">
              {["Easy", "Medium", "Hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  className={`stats-choice-btn ${
                    selectedDifficulty === difficulty ? "active" : ""
                  }`}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            {/* Rules Card */}
            <div className="stats-rules-card">
              <h2 className="stats-rules-heading">📋 Challenge Rules</h2>
              <ul className="stats-rules-list">
                <li className="stats-rules-item">
                  <span className="stats-rule-bullet">&#9679;</span>
                  <span>Answer real-world statistical records, milestones, and championship facts.</span>
                </li>
                <li className="stats-rules-item">
                  <span className="stats-rule-bullet">&#9679;</span>
                  <span>Each question gives you <strong>15 seconds</strong> to pick the correct answer.</span>
                </li>
                <li className="stats-rules-item">
                  <span className="stats-rule-bullet">&#9679;</span>
                  <span>All questions and answer options are randomized on every playthrough.</span>
                </li>
                <li className="stats-rules-item">
                  <span className="stats-rule-bullet">&#9679;</span>
                  <span>Every question includes its official governing body source reference.</span>
                </li>
              </ul>
            </div>

            {/* Availability Banner */}
            {availableQuestions.length > 0 ? (
              <div className="stats-info-banner">
                Ready! <strong>{availableQuestions.length} statistics questions</strong> available for{" "}
                <strong>{selectedSport === "All" ? "All Sports" : selectedSport} ({selectedDifficulty})</strong>.
              </div>
            ) : (
              <div className="stats-info-banner warning">
                No questions found for this combination. Please choose another sport or difficulty.
              </div>
            )}

            {/* Setup Actions */}
            <div className="stats-setup-actions">
              <a href="/arena" className="stats-btn-secondary">
                &larr; Back to Arena
              </a>
              <button
                type="button"
                className="stats-btn-primary"
                onClick={handleStartChallenge}
                disabled={availableQuestions.length === 0}
              >
                Start Challenge &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ================================================================
            2. PLAYING SCREEN
            ================================================================ */}
        {gameState === "playing" && currentQuestion && (
          <div className="stats-play-card">
            {/* Top Bar: Tags and Timer */}
            <div className="stats-top-bar">
              <div className="stats-meta-info">
                <span className="stats-tag">{currentQuestion.sport}</span>
                <span className="stats-tag">{currentQuestion.difficulty}</span>
                <span className="stats-tag">
                  Question {currentIndex + 1} of {gameQuestions.length}
                </span>
              </div>
              <div className={`stats-timer-pill ${timeLeft <= 5 ? "urgent" : ""}`}>
                ⏱ {timeLeft}s
              </div>
            </div>

            {/* Progress Bar */}
            <div className="stats-progress-bar-bg">
              <span
                className="stats-progress-bar-fill"
                style={{
                  width: `${((currentIndex + 1) / gameQuestions.length) * 100}%`
                }}
              ></span>
            </div>

            {/* Question Text */}
            <span className="stats-record-tag">Record Milestone</span>
            <h2 className="stats-question-heading">{currentQuestion.question}</h2>

            {/* Answer Options Grid */}
            <div className="stats-answers-grid">
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
                    className={`stats-answer-btn ${statusClass}`}
                    onClick={() => handleSelectOption(option)}
                    disabled={isLocked}
                  >
                    <span className="stats-answer-letter">
                      {OPTION_LETTERS[index]}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Explanation */}
            {isLocked && (
              <div
                className={`stats-feedback-box ${
                  selectedAnswer === currentQuestion.answer
                    ? "correct"
                    : selectedAnswer === null
                    ? "timeout"
                    : "incorrect"
                }`}
              >
                <div className="stats-feedback-title">
                  {selectedAnswer === currentQuestion.answer && "✓ Correct Stat!"}
                  {selectedAnswer !== null &&
                    selectedAnswer !== currentQuestion.answer &&
                    `✗ Incorrect! The correct record is: ${currentQuestion.answer}`}
                  {selectedAnswer === null &&
                    `⏰ Time's up! The correct record is: ${currentQuestion.answer}`}
                </div>
                <p className="stats-feedback-text">
                  <strong>Statistical Fact:</strong> {currentQuestion.explanation}
                </p>
                {currentQuestion.source && (
                  <p className="stats-source-text">
                    <em>Source: {currentQuestion.source}</em>
                  </p>
                )}
              </div>
            )}

            {/* Next Question / View Results Button */}
            {isLocked && (
              <div className="stats-bottom-actions">
                <button
                  type="button"
                  className="stats-btn-primary"
                  onClick={handleNextQuestion}
                >
                  {currentIndex + 1 < gameQuestions.length
                    ? "Next Question →"
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
          <div className="stats-results-card">
            <h1 className="stats-results-title">Stats Challenge Completed!</h1>
            <p className="stats-results-meta">
              Category: <strong>{selectedSport === "All" ? "All Sports" : selectedSport}</strong> &bull; Difficulty: <strong>{selectedDifficulty}</strong>
            </p>

            {/* Final Score Circle */}
            <div className="stats-score-circle">
              <span className="stats-score-number">{score}</span>
              <span className="stats-score-label">out of {gameQuestions.length}</span>
            </div>

            {/* Detailed Stats Grid */}
            <div className="stats-stats-grid">
              <div className="stats-stat-card">
                <div className="stats-stat-label">Correct</div>
                <div className="stats-stat-value correct">{correctCount}</div>
              </div>
              <div className="stats-stat-card">
                <div className="stats-stat-label">Incorrect</div>
                <div className="stats-stat-value incorrect">{incorrectCount}</div>
              </div>
              <div className="stats-stat-card">
                <div className="stats-stat-label">Unanswered</div>
                <div className="stats-stat-value unanswered">{unansweredCount}</div>
              </div>
              <div className="stats-stat-card">
                <div className="stats-stat-label">Accuracy</div>
                <div className="stats-stat-value accuracy">{calculateAccuracy()}%</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="stats-results-actions">
              <button
                type="button"
                className="stats-btn-primary"
                onClick={handlePlayAgain}
              >
                Play Again &#8635;
              </button>
              <a href="/arena" className="stats-btn-secondary">
                Back to Arena &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsChallenge;
