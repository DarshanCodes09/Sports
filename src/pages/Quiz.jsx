import React, { useState, useEffect } from "react";
import { quizQuestions } from "../data/quizQuestions.js";
import { saveGameResult } from "../utils/arenaStorage.js";
import "../styles/Quiz.css";

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
const SPORTS = ["Cricket", "Football", "Basketball", "Volleyball"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function Quiz() {
  const [selectedSport, setSelectedSport] = useState("Cricket");
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

  // Filter questions matching selected sport and difficulty
  const availableQuestions = quizQuestions.filter(
    (q) => q.sport === selectedSport && q.difficulty === selectedDifficulty
  );

  // Start a new 10-question quiz
  const handleStartQuiz = () => {
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
        gameName: "Sports Quiz",
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

  let feedbackTitle = "";
  let feedbackType = "";
  if (currentQuestion && isLocked) {
    if (selectedAnswer === currentQuestion.answer) {
      feedbackTitle = "Correct Answer!";
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
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {/* Setup Screen */}
        {gameState === "setup" && (
          <div className="quiz-setup-card">
            <header className="quiz-setup-header">
              <p className="quiz-badge">SPORTSVERSE ARENA</p>
              <h1 className="quiz-title">Sports Quiz Challenge</h1>
              <p className="quiz-subtitle">
                Select your favorite sport and difficulty level to test your trivia knowledge with randomized questions.
              </p>
            </header>

            <div className="quiz-section-label">Select Sport</div>
            <div className="quiz-options-group">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  className={`quiz-choice-btn ${selectedSport === sport ? "active" : ""}`}
                  onClick={() => setSelectedSport(sport)}
                >
                  {sport}
                </button>
              ))}
            </div>

            <div className="quiz-section-label">Select Difficulty</div>
            <div className="quiz-options-group">
              {DIFFICULTIES.map((difficulty) => (
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

            <div className="quiz-setup-actions">
              <a href="/arena" className="quiz-btn-secondary">
                Back to Arena
              </a>
              <button
                type="button"
                className="quiz-btn-primary"
                onClick={handleStartQuiz}
                disabled={availableQuestions.length === 0}
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {/* Playing Screen */}
        {gameState === "playing" && currentQuestion && (
          <div className="quiz-play-card">
            <div className="quiz-top-bar">
              <div className="quiz-meta-info">
                <span className="quiz-tag">{selectedSport}</span>
                <span className="quiz-tag">{selectedDifficulty}</span>
                <span className="quiz-tag">
                  Question {currentIndex + 1} of {gameQuestions.length}
                </span>
              </div>
              <div className={`quiz-timer-pill ${timeLeft <= 5 ? "urgent" : ""}`}>
                {timeLeft}s
              </div>
            </div>

            <div className="quiz-progress-bar-bg">
              <span
                className="quiz-progress-bar-fill"
                style={{
                  width: `${((currentIndex + 1) / gameQuestions.length) * 100}%`
                }}
              ></span>
            </div>

            <h2 className="quiz-question-heading">{currentQuestion.question}</h2>

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

            {isLocked && (
              <div className={`quiz-feedback-box ${feedbackType}`}>
                <div className="quiz-feedback-title">{feedbackTitle}</div>
                <p className="quiz-feedback-text">{currentQuestion.explanation}</p>
              </div>
            )}

            {isLocked && (
              <div className="quiz-bottom-actions">
                <button
                  type="button"
                  className="quiz-btn-primary"
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
          <div className="quiz-results-card">
            <h1 className="quiz-results-title">Quiz Completed!</h1>
            <p className="quiz-results-meta">
              Category: <strong>{selectedSport}</strong> | Difficulty: <strong>{selectedDifficulty}</strong>
            </p>

            <div className="quiz-score-circle">
              <span className="quiz-score-number">{score}</span>
              <span className="quiz-score-label">out of {gameQuestions.length}</span>
            </div>

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

            <div className="quiz-results-actions">
              <button
                type="button"
                className="quiz-btn-primary"
                onClick={handlePlayAgain}
              >
                Play Again
              </button>
              <a href="/arena" className="quiz-btn-secondary">
                Back to Arena
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
