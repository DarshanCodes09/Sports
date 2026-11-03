import React, { useState, useEffect } from "react";
import { flagQuestions } from "../data/questions.js";
import "../styles/FlagChallenge.css";

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

// Option letters (A, B, C, D)
const OPTION_LETTERS = ["A", "B", "C", "D"];

// Validates that each question contains a flag, answer, and 4 options including the answer
const isValidFlagQuestion = (q) =>
  Boolean(
    q &&
    typeof q.flag === "string" &&
    q.flag.trim() !== "" &&
    typeof q.answer === "string" &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    q.options.includes(q.answer)
  );

function FlagChallenge() {
  // Game lifecycle state: "setup" | "playing" | "results"
  const [gameState, setGameState] = useState("setup");

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

  // Filter only verified questions that pass structural validation
  const validFlagQuestions = (flagQuestions || []).filter(isValidFlagQuestion);

  // Starts a fresh randomized Flag Challenge session
  const handleStartChallenge = () => {
    if (validFlagQuestions.length === 0) return;

    // 1. Randomly shuffle the validated flag questions pool using Fisher-Yates
    const shuffledPool = shuffleArray(validFlagQuestions);

    // 2. Take up to 10 questions and shuffle their 4 country choices individually
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
    // Only tick when actively playing and current question is not locked
    if (gameState !== "playing" || isLocked) return;

    // If time expires, lock the question and record as unanswered
    if (timeLeft === 0) {
      setIsLocked(true);
      setUnansweredCount((prev) => prev + 1);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup timer on tick, question change, or component unmount
    return () => clearInterval(timerId);
  }, [gameState, isLocked, timeLeft]);

  // Handles user clicking an answer option
  const handleSelectOption = (option) => {
    if (isLocked) return;

    const currentQuestion = gameQuestions[currentIndex];
    setSelectedAnswer(option);
    setIsLocked(true);

    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  // Move to next question or show final results
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

  // Reset back to setup screen
  const handlePlayAgain = () => {
    setGameState("setup");
  };

  // Current active question
  const currentQuestion = gameQuestions[currentIndex];

  return (
    <div className="flag-wrapper">
      <div className="flag-container">
        {/* ================================================================
            1. SETUP SCREEN
            ================================================================ */}
        {gameState === "setup" && (
          <div className="flag-setup-card">
            <header className="flag-setup-header">
              <p className="flag-badge">STRIVORA GAMING ZONE</p>
              <h1 className="flag-title">FLAG CHALLENGE</h1>
              <p className="flag-subtitle">
                Test your sports knowledge by identifying the national flags of world-famous sporting nations.
              </p>
            </header>

            {/* Game Rules Card */}
            <div className="flag-rules-card">
              <h2 className="flag-rules-heading">📋 Challenge Rules</h2>
              <ul className="flag-rules-list">
                <li className="flag-rules-item">
                  <span className="flag-rule-bullet">&#9679;</span>
                  <span>Look at the national flag displayed on screen.</span>
                </li>
                <li className="flag-rules-item">
                  <span className="flag-rule-bullet">&#9679;</span>
                  <span>Use the sports hint to recall famous tournaments, players, or achievements.</span>
                </li>
                <li className="flag-rules-item">
                  <span className="flag-rule-bullet">&#9679;</span>
                  <span>Pick the correct country name from 4 randomized options before the 15-second timer ends.</span>
                </li>
                <li className="flag-rules-item">
                  <span className="flag-rule-bullet">&#9679;</span>
                  <span>Every playthrough randomizes the sequence of flags and answer choices.</span>
                </li>
              </ul>
            </div>

            {/* Availability Banner */}
            {validFlagQuestions.length > 0 ? (
              <div className="flag-info-banner">
                Ready! <strong>{validFlagQuestions.length} flag challenges</strong> are loaded and ready to play.
              </div>
            ) : (
              <div className="flag-info-banner warning">
                No valid flag questions found in the dataset. Please check back later.
              </div>
            )}

            {/* Setup Actions */}
            <div className="flag-setup-actions">
              <a href="/arena" className="flag-btn-secondary">
                &larr; Back to Arena
              </a>
              <button
                type="button"
                className="flag-btn-primary"
                onClick={handleStartChallenge}
                disabled={validFlagQuestions.length === 0}
              >
                Start Challenge &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ================================================================
            2. GAMEPLAY SCREEN
            ================================================================ */}
        {gameState === "playing" && currentQuestion && (
          <div className="flag-play-card">
            {/* Top Bar: Progress and Timer */}
            <div className="flag-top-bar">
              <div className="flag-meta-info">
                <span className="flag-tag">Flag Challenge</span>
                <span className="flag-tag">
                  Question {currentIndex + 1} of {gameQuestions.length}
                </span>
              </div>
              <div className={`flag-timer-pill ${timeLeft <= 5 ? "urgent" : ""}`}>
                ⏱ {timeLeft}s
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flag-progress-bar-bg">
              <span
                className="flag-progress-bar-fill"
                style={{
                  width: `${((currentIndex + 1) / gameQuestions.length) * 100}%`
                }}
              ></span>
            </div>

            {/* Flag Visual Card & Clue */}
            <div className="flag-display-box">
              <div
                className="flag-symbol"
                role="img"
                aria-label={`Flag for Question ${currentIndex + 1}`}
              >
                {currentQuestion.flag}
              </div>
              <h2 className="flag-prompt-title">Which sporting nation does this flag belong to?</h2>
              {currentQuestion.hint && (
                <p className="flag-hint-text">
                  <strong>Sports Clue:</strong> {currentQuestion.hint}
                </p>
              )}
            </div>

            {/* 4 Options Grid */}
            <div className="flag-options-grid">
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
                    className={`flag-option-btn ${statusClass}`}
                    onClick={() => handleSelectOption(option)}
                    disabled={isLocked}
                  >
                    <span className="flag-option-letter">
                      {OPTION_LETTERS[index]}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback */}
            {isLocked && (
              <div
                className={`flag-feedback-box ${
                  selectedAnswer === currentQuestion.answer
                    ? "correct"
                    : selectedAnswer === null
                    ? "timeout"
                    : "incorrect"
                }`}
              >
                <div className="flag-feedback-title">
                  {selectedAnswer === currentQuestion.answer && "✓ Correct Country!"}
                  {selectedAnswer !== null &&
                    selectedAnswer !== currentQuestion.answer &&
                    `✗ Incorrect! The correct country is: ${currentQuestion.answer}`}
                  {selectedAnswer === null &&
                    `⏰ Time's up! The correct country is: ${currentQuestion.answer}`}
                </div>
                {currentQuestion.explanation ? (
                  <p className="flag-feedback-text">
                    {currentQuestion.explanation}
                  </p>
                ) : currentQuestion.hint ? (
                  <p className="flag-feedback-text">
                    <strong>Sports Clue:</strong> {currentQuestion.hint}
                  </p>
                ) : null}
              </div>
            )}

            {/* Next Question / View Results Button */}
            {isLocked && (
              <div className="flag-bottom-actions">
                <button
                  type="button"
                  className="flag-btn-primary"
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
          <div className="flag-results-card">
            <h1 className="flag-results-title">Challenge Completed!</h1>
            <p className="flag-results-meta">
              Great effort! Here is your performance in the Flag Challenge:
            </p>

            {/* Final Score Circle */}
            <div className="flag-score-circle">
              <span className="flag-score-number">{score}</span>
              <span className="flag-score-label">out of {gameQuestions.length}</span>
            </div>

            {/* Detailed Stats Grid */}
            <div className="flag-stats-grid">
              <div className="flag-stat-card">
                <div className="flag-stat-label">Correct</div>
                <div className="flag-stat-value correct">{correctCount}</div>
              </div>
              <div className="flag-stat-card">
                <div className="flag-stat-label">Incorrect</div>
                <div className="flag-stat-value incorrect">{incorrectCount}</div>
              </div>
              <div className="flag-stat-card">
                <div className="flag-stat-label">Unanswered</div>
                <div className="flag-stat-value unanswered">{unansweredCount}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flag-results-actions">
              <button
                type="button"
                className="flag-btn-primary"
                onClick={handlePlayAgain}
              >
                Play Again &#8635;
              </button>
              <a href="/arena" className="flag-btn-secondary">
                Back to Arena &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlagChallenge;
