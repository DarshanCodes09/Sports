import React, { useState, useEffect } from "react";
import { statistics } from "../data/statistics.js";
import { saveGameResult } from "../utils/arenaStorage.js";
import "../styles/StatsChallenge.css";

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

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function StatsChallenge() {
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [gameState, setGameState] = useState("setup");

  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);

  // Filter questions based on sport and difficulty
  const availableQuestions = statistics.filter((q) => {
    const matchesSport = selectedSport === "All" || q.sport === selectedSport;
    const matchesDifficulty = q.difficulty === selectedDifficulty;
    return matchesSport && matchesDifficulty;
  });

  // Start a new 10-question stats challenge
  const handleStartChallenge = () => {
    if (availableQuestions.length === 0) return;

    const shuffledPool = shuffleArray(availableQuestions);
    const chosenQuestions = shuffledPool.slice(0, 10).map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options)
    }));

    setGameQuestions(chosenQuestions);
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

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
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

  // Move to next question or view results
  const handleNextQuestion = () => {
    if (currentIndex + 1 < gameQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
      setTimeLeft(15);
    } else {
      saveGameResult({
        gameName: "Stats Challenge",
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

  const currentQuestion = gameQuestions[currentIndex];

  const accuracy =
    gameQuestions.length > 0
      ? Math.round((correctCount / gameQuestions.length) * 100)
      : 0;

  let feedbackTitle = "";
  let feedbackType = "";
  if (currentQuestion && isLocked) {
    if (selectedAnswer === currentQuestion.answer) {
      feedbackTitle = "Correct Stat!";
      feedbackType = "correct";
    } else if (selectedAnswer === null) {
      feedbackTitle = `Time's up! The correct record is: ${currentQuestion.answer}`;
      feedbackType = "timeout";
    } else {
      feedbackTitle = `Incorrect! The correct record is: ${currentQuestion.answer}`;
      feedbackType = "incorrect";
    }
  }

  return (
    <div className="stats-wrapper">
      <div className="stats-container">
        {/* Setup Screen */}
        {gameState === "setup" && (
          <div className="stats-setup-card">
            <header className="stats-setup-header">
              <p className="stats-badge">SPORTSVERSE ARENA</p>
              <h1 className="stats-title">STATS CHALLENGE</h1>
              <p className="stats-subtitle">
                Test your knowledge of sports milestones, historical records, and world-class statistics across cricket, football, basketball, and volleyball.
              </p>
            </header>

            <div className="stats-section-label">Select Sport</div>
            <div className="stats-options-grid">
              {SPORTS.map((sportItem) => (
                <button
                  key={sportItem.value}
                  type="button"
                  className={`stats-choice-btn ${selectedSport === sportItem.value ? "active" : ""}`}
                  onClick={() => setSelectedSport(sportItem.value)}
                >
                  {sportItem.label}
                </button>
              ))}
            </div>

            <div className="stats-section-label">Select Difficulty</div>
            <div className="stats-options-grid">
              {DIFFICULTIES.map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  className={`stats-choice-btn ${selectedDifficulty === difficulty ? "active" : ""}`}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            <div className="stats-rules-card">
              <h2 className="stats-rules-heading">Challenge Rules</h2>
              <ul className="stats-rules-list">
                <li className="stats-rules-item">
                  <span className="stats-rule-bullet">-</span>
                  <span>Answer real-world statistical records, milestones, and championship facts.</span>
                </li>
                <li className="stats-rules-item">
                  <span className="stats-rule-bullet">-</span>
                  <span>Each question gives you <strong>15 seconds</strong> to pick the correct answer.</span>
                </li>
                <li className="stats-rules-item">
                  <span className="stats-rule-bullet">-</span>
                  <span>All questions and answer options are randomized on every playthrough.</span>
                </li>
                <li className="stats-rules-item">
                  <span className="stats-rule-bullet">-</span>
                  <span>Every question includes its official governing body source reference.</span>
                </li>
              </ul>
            </div>

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

            <div className="stats-setup-actions">
              <a href="/arena" className="stats-btn-secondary">
                Back to Arena
              </a>
              <button
                type="button"
                className="stats-btn-primary"
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
          <div className="stats-play-card">
            <div className="stats-top-bar">
              <div className="stats-meta-info">
                <span className="stats-tag">{currentQuestion.sport}</span>
                <span className="stats-tag">{currentQuestion.difficulty}</span>
                <span className="stats-tag">
                  Question {currentIndex + 1} of {gameQuestions.length}
                </span>
              </div>
              <div className={`stats-timer-pill ${timeLeft <= 5 ? "urgent" : ""}`}>
                {timeLeft}s
              </div>
            </div>

            <div className="stats-progress-bar-bg">
              <span
                className="stats-progress-bar-fill"
                style={{
                  width: `${((currentIndex + 1) / gameQuestions.length) * 100}%`
                }}
              ></span>
            </div>

            <span className="stats-record-tag">Record Milestone</span>
            <h2 className="stats-question-heading">{currentQuestion.question}</h2>

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

            {isLocked && (
              <div className={`stats-feedback-box ${feedbackType}`}>
                <div className="stats-feedback-title">{feedbackTitle}</div>
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

            {isLocked && (
              <div className="stats-bottom-actions">
                <button
                  type="button"
                  className="stats-btn-primary"
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
          <div className="stats-results-card">
            <h1 className="stats-results-title">Stats Challenge Completed!</h1>
            <p className="stats-results-meta">
              Category: <strong>{selectedSport === "All" ? "All Sports" : selectedSport}</strong> | Difficulty: <strong>{selectedDifficulty}</strong>
            </p>

            <div className="stats-score-circle">
              <span className="stats-score-number">{score}</span>
              <span className="stats-score-label">out of {gameQuestions.length}</span>
            </div>

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
                <div className="stats-stat-value accuracy">{accuracy}%</div>
              </div>
            </div>

            <div className="stats-results-actions">
              <button
                type="button"
                className="stats-btn-primary"
                onClick={handlePlayAgain}
              >
                Play Again
              </button>
              <a href="/arena" className="stats-btn-secondary">
                Back to Arena
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsChallenge;
