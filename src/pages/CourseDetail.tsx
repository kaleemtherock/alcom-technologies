import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBook, FaClock, FaCheckCircle, FaLock, FaPlay, FaArrowLeft } from 'react-icons/fa';
import { Course } from '../types/course';

// Update the import path to match your file structure
import { coursesData } from './courses/index';

const CoursePreview = ({ thumbnailUrl, videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);
  
  return (
    <div className="relative rounded-xl overflow-hidden mb-8 h-96">
      {!showVideo ? (
        <div className="relative w-full h-full">
          <img 
            src={thumbnailUrl || 'https://via.placeholder.com/1200x600?text=Course+Preview'} 
            alt="Course Preview" 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all"
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              <FaPlay className="text-blue-600 text-3xl ml-2" />
            </div>
          </button>
        </div>
      ) : (
        <video 
          src={videoUrl} 
          controls 
          autoPlay 
          className="w-full h-full object-cover"
          onError={() => setShowVideo(false)}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

const ChapterQuiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const score = answers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      onComplete(score);
    }
  };
  
  if (!questions || questions.length === 0) return null;
  
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold text-lg mb-4">Chapter Quiz</h4>
      
      {!showResults ? (
        <div>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <div 
                key={index}
                className={`p-3 border rounded-lg cursor-pointer ${
                  answers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className={`mt-4 px-4 py-2 rounded-lg ${
              answers[currentQuestion] !== undefined 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold">Quiz Completed!</p>
          <p className="mt-2">
            You scored {answers.filter((answer, index) => answer === questions[index].correctAnswer).length} out of {questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [expandedTopics, setExpandedTopics] = useState([]);
  
  useEffect(() => {
    // Find the course by ID
    const foundCourse = coursesData.find(c => c.id.toString() === id);
    
    if (foundCourse) {
      // Add additional properties needed for the detail page
      setCourse({
        ...foundCourse,
        chapters: [
          {
            id: 'chapter-1',
            title: 'Introduction to the Course',
            description: 'Get started with the fundamentals and course overview.',
            duration: '45 minutes',
            topics: [
              'Course Overview',
              'Setting Up Your Environment',
              'Basic Concepts'
            ],
            quiz: [
              {
                question: 'What is the main focus of this course?',
                options: [
                  'Web Development',
                  foundCourse.category,
                  'Mobile Development',
                  'Game Development'
                ],
                correctAnswer: 1
              },
              {
                question: 'How long is this course?',
                options: [
                  '4 weeks',
                  '6 weeks',
                  foundCourse.duration,
                  '16 weeks'
                ],
                correctAnswer: 2
              }
            ]
          },
          {
            id: 'chapter-2',
            title: 'Core Concepts',
            description: 'Learn the essential concepts and techniques.',
            duration: '1.5 hours',
            topics: [
              'Advanced Techniques',
              'Practical Applications',
              'Case Studies'
            ]
          },
          {
            id: 'chapter-3',
            title: 'Practical Implementation',
            description: 'Apply what you\'ve learned to real-world scenarios.',
            duration: '2 hours',
            topics: [
              'Project Setup',
              'Implementation Steps',
              'Testing and Validation'
            ]
          }
        ],
        prerequisites: [
          'Basic understanding of programming',
          'Familiarity with development environments',
          'Problem-solving skills'
        ],
        skills: [
          foundCourse.category + ' fundamentals',
          'Problem-solving in ' + foundCourse.category,
          'Practical application of concepts',
          'Industry best practices'
        ]
      });
    }
  }, [id]);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold">Course not found</h2>
        <button 
          onClick={() => navigate('/courses')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-blue-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Back to Courses
      </button>
      
      <CoursePreview 
        videoUrl="/course-preview.mp4"
        thumbnailUrl={course.image}
      />
      
      <h1 className="text-4xl font-bold mb-8">{course.title}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
            <p className="text-gray-600">{course.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaClock className="text-blue-600" />
                <span>Total Duration: {course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBook className="text-blue-600" />
                <span>{course.chapters.length} Chapters</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.chapters.map((chapter, index) => (
                <div 
                  key={chapter.id} 
                  className={`border rounded-lg p-4 ${
                    selectedChapter === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <button
                    className="w-full text-left"
                    onClick={() => setSelectedChapter(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        {index + 1}. {chapter.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{chapter.duration}</span>
                        {index === 0 ? <FaPlay className="text-green-500" /> : <FaLock className="text-gray-400" />}
                      </div>
                    </div>
                  </button>
                  
                  {selectedChapter === index && (
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-600">{chapter.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Topics:</h4>
                        <ul className="space-y-2">
                          {chapter.topics.map((topic, i) => (
                            <li 
                              key={i}
                              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer"
                              onClick={() => toggleTopic(`${chapter.id}-${i}`)}
                            >
                              <FaCheckCircle className="text-gray-400" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {chapter.quiz && (
                        <ChapterQuiz
                          questions={chapter.quiz}
                          onComplete={(score) => {
                            console.log(`Quiz completed with score: ${score}`);
                            // Handle quiz completion
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Level:</h3>
                <p className="text-gray-600">{course.level}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instructor:</h3>
                <p className="text-gray-600">{course.instructor}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Prerequisites:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {course.prerequisites?.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Skills You'll Learn:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {course.skills?.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price:</h3>
                <p className="text-2xl font-bold text-blue-600">${course.price}</p>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;