import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaClock, FaRedo, FaLock } from 'react-icons/fa';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ChapterQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  timeLimit?: number; // in minutes
}

interface UserProgress {
  userId: string;
  courseId: string;
  chapterId: string;
  quizScore: number;
  completedAt: Date;
}

const ChapterQuiz = ({ questions, onComplete, timeLimit, userId, courseId, chapterId }: ChapterQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : 0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    if (timeLimit && isTimerActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLimit, isTimerActive, timeRemaining]);

  const startQuiz = () => {
    setIsTimerActive(true);
  };

  const saveProgress = async (score: number) => {
    if (!userId) return;

    const progress: UserProgress = {
      userId,
      courseId,
      chapterId,
      quizScore: score,
      completedAt: new Date()
    };

    try {
      // This will be implemented when we add the backend
      // await saveUserProgress(progress);
      console.log('Progress saved:', progress);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const handleSubmit = () => {
    const score = answers.reduce((acc, answer, index) => {
      const questionPoints = questions[index].difficulty === 'easy' ? 1 :
                           questions[index].difficulty === 'medium' ? 2 : 3;
      return answer === questions[index].correctAnswer ? acc + questionPoints : acc;
    }, 0);

    setShowResults(true);
    onComplete(score);
    saveProgress(score);
  };

  if (!userId) {
    return (
      <div className="text-center p-8">
        <FaLock className="text-gray-400 text-4xl mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Please Sign In</h3>
        <p className="text-gray-600 mb-4">You need to be signed in to take this quiz</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      {!isTimerActive && !showResults ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Start?</h3>
          <p className="text-gray-600 mb-6">
            You have {timeLimit} minutes to complete this quiz
          </p>
          <button
            onClick={startQuiz}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {timeLimit && (
            <div className="flex items-center gap-2 mb-4 text-gray-600">
              <FaClock />
              <span>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
            </div>
          )}

          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm ${
              questions[currentQuestion].difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              questions[currentQuestion].difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {questions[currentQuestion].difficulty}
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className="text-gray-700 mb-4">{questions[currentQuestion].question}</p>
          
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-3 text-left rounded-lg border flex justify-between items-center ${
                  answers[currentQuestion] === index
                    ? isReviewMode
                      ? index === questions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleAnswer(index)}
                disabled={isReviewMode}
              >
                <span>{option}</span>
                {isReviewMode && index === questions[currentQuestion].correctAnswer && (
                  <FaCheck className="text-green-500" />
                )}
              </button>
            ))}
          </div>

          {showExplanation && questions[currentQuestion].explanation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
          <div className="text-6xl font-bold mb-6 text-blue-600">
            {Math.round((answers.filter((a, i) => a === questions[i].correctAnswer).length / questions.length) * 100)}%
          </div>
          <p className="text-gray-600 mb-6">
            You scored {answers.filter((a, i) => a === questions[i].correctAnswer).length} out of {questions.length}
          </p>
          <button
            onClick={startReview}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
          >
            <FaRedo />
            Review Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default ChapterQuiz;