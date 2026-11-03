import React, { useState, useEffect } from "react";
import { quizQuestions } from "../data/questions.js";
import "../styles/Quiz.css";

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

function Quiz() {
  // Game setup state
  const [selectedSport, setSelectedSport] = useState("Cricket");
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

  // Filter matching questions from questions.js
  const availableQuestions = quizQuestions.filter(
    (q) => q.sport === selectedSport && q.difficulty === selectedDifficulty
  );

  // Starts a new randomized quiz session
  const handleStartQuiz = () => {
    if (availableQuestions.length === 0) return;

    // 1. Randomly shuffle the filtered question pool using Fisher-Yates
    const shuffledPool = shuffleArray(availableQuestions);

    // 2. Select up to 10 questions and shuffle their 4 answer choices individually
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

  // Current active question
  const currentQuestion = gameQuestions[currentIndex];

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {/* ================================================================
            1. SETUP SCREEN
            ================================================================ */}
        {gameState === "setup" && (
          <div className="quiz-setup-card">
            <header className="quiz-setup-header">
              <p className="quiz-badge">STRIVORA GAMING ZONE</p>
              <h1 className="quiz-title">Sports Quiz Challenge</h1>
              <p className="quiz-subtitle">
                Select your favorite sport and difficulty level to test your trivia knowledge with randomized questions.
              </p>
            </header>

            {/* Sport Selection */}
            <div className="quiz-section-label">Select Sport</div>
            <div className="quiz-options-group">
              {["Cricket", "Football", "Basketball", "Volleyball"].map((sport) => (
                <button
                  key={sport}
                  type="button"
                  className={`quiz-choice-btn ${selectedSport === sport ? "active" : ""}`}
                  onClick={() => setSelectedSport(sport)}
                >
                  {sport === "Cricket" && "🏏"}
                  {sport === "Football" && "⚽"}
                  {sport === "Basketball" && "🏀"}
                  {sport === "Volleyball" && "🏐"} {sport}
                </button>
              ))}
            </div>

            {/* Difficulty Selection */}
            <div className="quiz-section-label">Select Difficulty</div>
            <div className="quiz-options-group">
              {["Easy", "Medium", "Hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  className={`quiz-choice-btn ${selectedDifficulty === difficulty ? "active" : ""}`}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            {/* Questions Availability Banner */}
            {availableQuestions.length > 0 ? (
              <div className="quiz-info-banner">
                Ready! {availableQuestions.length} questions available for{" "}
                <strong>{selectedSport} ({selectedDifficulty})</strong>. Questions and answers will be randomized.
              </div>
            ) : (
              <div className="quiz-info-banner warning">
                No questions found for this combination. Please choose another sport or difficulty.
              </div>
            )}

            {/* Setup Actions */}
            <div className="quiz-setup-actions">
              <a href="/arena" className="quiz-btn-secondary">
                &larr; Back to Arena
              </a>
              <button
                type="button"
                className="quiz-btn-primary"
                onClick={handleStartQuiz}
                disabled={availableQuestions.length === 0}
              >
                Start Quiz &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ================================================================
            2. QUIZ SCREEN
            ================================================================ */}
        {gameState === "playing" && currentQuestion && (
          <div className="quiz-play-card">
            {/* Top Bar: Tags and Timer */}
            <div className="quiz-top-bar">
              <div className="quiz-meta-info">
                <span className="quiz-tag">{selectedSport}</span>
                <span className="quiz-tag">{selectedDifficulty}</span>
                <span className="quiz-tag">
                  Question {currentIndex + 1} of {gameQuestions.length}
                </span>
              </div>
              <div className={`quiz-timer-pill ${timeLeft <= 5 ? "urgent" : ""}`}>
                ⏱ {timeLeft}s
              </div>
            </div>

            {/* Progress Bar */}
            <div className="quiz-progress-bar-bg">
              <span
                className="quiz-progress-bar-fill"
                style={{
                  width: `${((currentIndex + 1) / gameQuestions.length) * 100}%`
                }}
              ></span>
            </div>

            {/* Question Text */}
            <h2 className="quiz-question-heading">{currentQuestion.question}</h2>

            {/* Answer Options Grid */}
            <div className="quiz-answers-grid">
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
                    className={`quiz-answer-btn ${statusClass}`}
                    onClick={() => handleSelectOption(option)}
                    disabled={isLocked}
                  >
                    <span className="quiz-answer-letter">
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
                className={`quiz-feedback-box ${
                  selectedAnswer === currentQuestion.answer
                    ? "correct"
                    : selectedAnswer === null
                    ? "timeout"
                    : "incorrect"
                }`}
              >
                <div className="quiz-feedback-title">
                  {selectedAnswer === currentQuestion.answer && "✓ Correct Answer!"}
                  {selectedAnswer !== null &&
                    selectedAnswer !== currentQuestion.answer &&
                    `✗ Incorrect! The correct answer is: ${currentQuestion.answer}`}
                  {selectedAnswer === null &&
                    `⏰ Time's up! The correct answer is: ${currentQuestion.answer}`}
                </div>
                <p className="quiz-feedback-text">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Next Question / View Results Button */}
            {isLocked && (
              <div className="quiz-bottom-actions">
                <button
                  type="button"
                  className="quiz-btn-primary"
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
          <div className="quiz-results-card">
            <h1 className="quiz-results-title">Quiz Completed!</h1>
            <p className="quiz-results-meta">
              Category: <strong>{selectedSport}</strong> &bull; Difficulty: <strong>{selectedDifficulty}</strong>
            </p>

            {/* Final Score Circle */}
            <div className="quiz-score-circle">
              <span className="quiz-score-number">{score}</span>
              <span className="quiz-score-label">out of {gameQuestions.length}</span>
            </div>

            {/* Detailed Stats Grid */}
            <div className="quiz-stats-grid">
              <div className="quiz-stat-card">
                <div className="quiz-stat-label">Correct</div>
                <div className="quiz-stat-value correct">{correctCount}</div>
              </div>
              <div className="quiz-stat-card">
                <div className="quiz-stat-label">Incorrect</div>
                <div className="quiz-stat-value incorrect">{incorrectCount}</div>
              </div>
              <div className="quiz-stat-card">
                <div className="quiz-stat-label">Unanswered</div>
                <div className="quiz-stat-value unanswered">{unansweredCount}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="quiz-results-actions">
              <button
                type="button"
                className="quiz-btn-primary"
                onClick={handlePlayAgain}
              >
                Play Again &#8635;
              </button>
              <a href="/arena" className="quiz-btn-secondary">
                Back to Arena &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
