import { useState } from "react";

function Quiz({ quiz, onExit }) {
  const [activeQuiz, setActiveQuiz] = useState(quiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);

  if (!activeQuiz || activeQuiz.length === 0) {
    return <h2>No Quiz Available</h2>;
  }

  const question = activeQuiz[currentQuestion];

  const handleOptionSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleSubmit = () => {
    // Validation: all questions must be answered
    if (Object.keys(selectedAnswers).length !== activeQuiz.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let total = 0;
    const wrong = [];

    activeQuiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        total++;
      } else {
        wrong.push(q);
      }
    });

    setScore(total);
    setWrongQuestions(wrong);
    setShowReview(true);
  };

  const handleRetakeWrong = () => {
    if (wrongQuestions.length === 0) {
      alert("Perfect Score! No wrong questions to retake.");
      return;
    }

    setActiveQuiz(wrongQuestions);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setShowReview(false);
    setShowResult(false);
  };

  // REVIEW SCREEN
  if (showReview) {
    return (
      <div className="bg-white rounded-xl shadow-lg border p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Quiz Review
        </h2>

        {activeQuiz.map((q, index) => {
          const isCorrect =
            selectedAnswers[index] === q.correctAnswer;

          return (
            <div
              key={index}
              className={`mb-8 p-5 rounded-lg border ${
                isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <h3 className="font-bold text-lg">
                Q{index + 1}. {q.question}
              </h3>

              <p className="mt-3">
                <strong>Your Answer:</strong> {" "}
                <span
                  className={
                    isCorrect
                      ? "text-green-700 font-semibold"
                      : "text-red-700 font-semibold"
                  }
                >
                  {selectedAnswers[index]}
                </span>
              </p>

              {!isCorrect && (
                <p className="mt-2 text-green-700 font-semibold">
                  <strong>Correct Answer:</strong> {" "}
                  {q.correctAnswer}
                </p>
              )}

              <p className="mt-3 font-bold">
                {isCorrect ? "✅ Correct" : "❌ Wrong"}
              </p>
            </div>
          );
        })}

        <div className="text-center">
          <button
            onClick={() => {
              setShowReview(false);
              setShowResult(true);
            }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // RESULT SCREEN
  if (showResult) {
    return (
      <div className="bg-white rounded-xl shadow-lg border p-8 text-center">
        <h2 className="text-3xl font-bold text-green-700">
          Quiz Finished!
        </h2>

        <p className="mt-6 text-xl">
          Score: {score} / {activeQuiz.length}
        </p>

        <p className="mt-2 text-lg">
          Correct: {score} | Wrong: {activeQuiz.length - score}
        </p>

        <button
          onClick={handleRetakeWrong}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Retake Wrong Questions
        </button>

        <button
          onClick={onExit}
          className="mt-4 ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
        >
          Back to Flashcards
        </button>
      </div>
    );
  }

  // QUIZ SCREEN
  return (
    <div className="bg-white rounded-xl shadow-lg border p-8">
      <h2 className="text-2xl font-bold mb-5">
        Question {currentQuestion + 1} of {activeQuiz.length}
      </h2>

      <p className="text-lg mb-6">
        {question.question}
      </p>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`block border rounded-lg p-4 cursor-pointer hover:bg-indigo-50 ${
              selectedAnswers[currentQuestion] === option
                ? "bg-indigo-100 border-indigo-600"
                : ""
            }`}
          >
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              checked={selectedAnswers[currentQuestion] === option}
              onChange={() => handleOptionSelect(option)}
              className="mr-3"
            />
            {option}
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestion === activeQuiz.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;