import React, { useState, useEffect } from "react";
import { flagQuestions } from "../data/flagQuestions.js";
import { internationalTeamQuestions } from "../data/internationalTeamQuestions.js";
import { cricketLeagueQuestions } from "../data/cricketLeagueQuestions.js";
import { footballLeagueQuestions } from "../data/footballLeagueQuestions.js";
import { saveGameResult } from "../utils/arenaStorage.js";
import "../styles/FlagChallenge.css";

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

const CATEGORIES = [
  { id: "All", label: "All Categories", badge: "120 Questions" },
  { id: "Country Flags", label: "Country Flags", badge: "30 Questions" },
  { id: "International Team Logos", label: "International Logos", badge: "30 Questions" },
  { id: "Cricket Leagues and Teams", label: "Cricket Leagues & Teams", badge: "30 Questions" },
  { id: "Football Leagues and Clubs", label: "Football Leagues & Clubs", badge: "30 Questions" }
];

// Combine all 4 datasets into one list of 120 questions
const ALL_CHALLENGES = [
  ...flagQuestions,
  ...internationalTeamQuestions,
  ...cricketLeagueQuestions,
  ...footballLeagueQuestions
];

function FlagChallenge() {
  const [gameState, setGameState] = useState("setup");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);

  // Filter questions based on selected category
  const availableQuestions =
    selectedCategory === "All"
      ? ALL_CHALLENGES
      : ALL_CHALLENGES.filter((q) => q.category === selectedCategory);

  // Start a new 10-question game
  const handleStartChallenge = () => {
    if (availableQuestions.length === 0) return;

    const shuffledPool = shuffleArray(availableQuestions);
    const selectedQuestions = shuffledPool.slice(0, 10).map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options)
    }));

    setGameQuestions(selectedQuestions);
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

  // 15-second countdown timer
  useEffect(() => {
    if (gameState !== "playing" || isLocked) return;

    if (timeLeft === 0) {
      setIsLocked(true);
      setUnansweredCount((prev) => prev + 1);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameState, isLocked, timeLeft]);

  // Handle answer selection
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

  // Move to next question or finish game
  const handleNextQuestion = () => {
    if (currentIndex + 1 < gameQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
      setTimeLeft(15);
    } else {
      saveGameResult({
        gameName: "Flag Challenge",
        score,
        correctCount,
        wrongCount: incorrectCount + unansweredCount,
        xpEarned: score * 10
      });
      setGameState("results");
    }
  };

  const handlePlayAgain = () => {
    setGameState("setup");
  };

  const getQuestionHeading = (question) => {
    if (!question) return "Identify the sports symbol";
    if (question.category === "Country Flags") {
      return "Which sporting nation does this flag belong to?";
    }
    if (question.category === "Cricket Leagues and Teams") {
      return "Which cricket tournament or franchise team does this emblem belong to?";
    }
    if (question.category === "Football Leagues and Clubs") {
      return "Which football league or club does this crest belong to?";
    }
    return "Which international sports federation or national team does this emblem belong to?";
  };

  const currentQuestion = gameQuestions[currentIndex];
  const imageSrc = currentQuestion ? (currentQuestion.image || currentQuestion.flag) : "";

  const accuracy =
    gameQuestions.length > 0
      ? Math.round((correctCount / gameQuestions.length) * 100)
      : 0;

  let feedbackTitle = "";
  let feedbackType = "";
  if (currentQuestion && isLocked) {
    if (selectedAnswer === currentQuestion.answer) {
      feedbackTitle = `Correct! It is ${currentQuestion.answer}.`;
      feedbackType = "correct";
    } else if (selectedAnswer === null) {
      feedbackTitle = `Time's up! The correct answer is: ${currentQuestion.answer}`;
      feedbackType = "timeout";
    } else {
      feedbackTitle = `Incorrect! The correct answer is: ${currentQuestion.answer}`;
      feedbackType = "incorrect";
    }
  }

  return (
    <div className="flag-wrapper">
      <div className="flag-container">
        {/* Setup Screen */}
        {gameState === "setup" && (
          <div className="flag-setup-card">
            <header className="flag-setup-header">
              <p className="flag-badge">SPORTSVERSE ARENA</p>
              <h1 className="flag-title">FLAG CHALLENGE</h1>
              <p className="flag-subtitle">
                Test your sports knowledge by identifying national country flags, international sports federation logos, and premier franchise cricket & football club crests.
              </p>
            </header>

            <div className="flag-section-label">Select Game Category</div>
            <div className="flag-category-grid">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`flag-category-btn ${selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="flag-category-name">{cat.label}</span>
                  <span className="flag-category-count">{cat.badge}</span>
                </button>
              ))}
            </div>

            <div className="flag-rules-card">
              <h2 className="flag-rules-heading">Challenge Rules</h2>
              <ul className="flag-rules-list">
                <li className="flag-rules-item">
                  <span className="flag-rule-bullet">-</span>
                  <span>Inspect the high-resolution flag, federation emblem, or club crest on screen.</span>
                </li>
                <li className="flag-rules-item">
                  <span className="flag-rule-bullet">-</span>
                  <span>Pick the correct identity from 4 randomized options before the 15-second timer expires.</span>
                </li>
                <li className="flag-rules-item">
                  <span className="flag-rule-bullet">-</span>
                  <span>Every playthrough randomizes the sequence of questions and answer choices with no repeats.</span>
                </li>
                <li className="flag-rules-item">
                  <span className="flag-rule-bullet">-</span>
                  <span>Test your knowledge across country flags, international teams, cricket franchises, and football clubs.</span>
                </li>
              </ul>
            </div>

            {availableQuestions.length > 0 ? (
              <div className="flag-info-banner">
                Ready! <strong>{availableQuestions.length} verified challenges</strong> loaded for{" "}
                <strong>{selectedCategory === "All" ? "All Categories" : selectedCategory}</strong>.
              </div>
            ) : (
              <div className="flag-info-banner warning">
                No questions found for this category. Please select another option.
              </div>
            )}

            <div className="flag-setup-actions">
              <a href="/arena" className="flag-btn-secondary">
                Back to Arena
              </a>
              <button
                type="button"
                className="flag-btn-primary"
                onClick={handleStartChallenge}
                disabled={availableQuestions.length === 0}
              >
                Start Challenge
              </button>
            </div>
          </div>
        )}

        {/* Playing Screen */}
        {gameState === "playing" && currentQuestion && (
          <div className="flag-play-card">
            <div className="flag-top-bar">
              <div className="flag-meta-info">
                <span className="flag-tag">{currentQuestion.category}</span>
                {currentQuestion.sport && (
                  <span className="flag-tag">{currentQuestion.sport}</span>
                )}
                <span className="flag-tag">
                  Question {currentIndex + 1} of {gameQuestions.length}
                </span>
              </div>
              <div className={`flag-timer-pill ${timeLeft <= 5 ? "urgent" : ""}`}>
                {timeLeft}s
              </div>
            </div>

            <div className="flag-progress-bar-bg">
              <span
                className="flag-progress-bar-fill"
                style={{
                  width: `${((currentIndex + 1) / gameQuestions.length) * 100}%`
                }}
              ></span>
            </div>

            <div className="flag-display-box">
              <div
                className="flag-symbol"
                role="img"
                aria-label={`Emblem for ${currentQuestion.answer}`}
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={currentQuestion.answer}
                    className="flag-image"
                  />
                ) : (
                  <span className="flag-fallback-icon">No Image</span>
                )}
              </div>
              <h2 className="flag-prompt-title">{getQuestionHeading(currentQuestion)}</h2>
            </div>

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

            {isLocked && (
              <div className={`flag-feedback-box ${feedbackType}`}>
                <div className="flag-feedback-title">{feedbackTitle}</div>

                <div className="flag-reveal-card">
                  <img
                    src={imageSrc}
                    alt={currentQuestion.answer}
                    className="flag-reveal-thumb"
                  />
                  <div className="flag-reveal-info">
                    <h3 className="flag-reveal-name">{currentQuestion.answer}</h3>
                  </div>
                </div>

                {currentQuestion.hint && (
                  <p className="flag-hint-text" style={{ marginBottom: "0.75rem", color: "var(--color-crimson-accent, #c9233b)" }}>
                    <strong>Key Fact:</strong> {currentQuestion.hint}
                  </p>
                )}
                {currentQuestion.explanation && (
                  <p className="flag-feedback-text">
                    {currentQuestion.explanation}
                  </p>
                )}
                {currentQuestion.source && (
                  <p className="flag-source-text">
                    <em>Source: {currentQuestion.source}</em>
                  </p>
                )}
              </div>
            )}

            {isLocked && (
              <div className="flag-bottom-actions">
                <button
                  type="button"
                  className="flag-btn-primary"
                  onClick={handleNextQuestion}
                >
                  {currentIndex + 1 < gameQuestions.length
                    ? "Next Question"
                    : "View Results"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Screen */}
        {gameState === "results" && (
          <div className="flag-results-card">
            <h1 className="flag-results-title">Challenge Completed!</h1>
            <p className="flag-results-meta">
              Category: <strong>{selectedCategory === "All" ? "All Categories" : selectedCategory}</strong>
            </p>

            <div className="flag-score-circle">
              <span className="flag-score-number">{score}</span>
              <span className="flag-score-label">out of {gameQuestions.length}</span>
            </div>

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
              <div className="flag-stat-card">
                <div className="flag-stat-label">Accuracy</div>
                <div className="flag-stat-value accuracy">{accuracy}%</div>
              </div>
            </div>

            <div className="flag-results-actions">
              <button
                type="button"
                className="flag-btn-primary"
                onClick={handlePlayAgain}
              >
                Play Again
              </button>
              <a href="/arena" className="flag-btn-secondary">
                Back to Arena
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlagChallenge;
