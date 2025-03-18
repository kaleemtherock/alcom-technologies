import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaStar, FaUserGraduate, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Course } from '../../types/course';

// Export the coursesData array
export const coursesData: Course[] = [
  {
    id: '1',
    title: 'Introduction to Artificial Intelligence',
    description: 'Learn the fundamentals of AI, including machine learning, neural networks, and natural language processing.',
    instructor: {
      name: 'Shaik Abdul Kaleem',
      expertise: 'AI and Machine Learning',
      avatar: '/images/instructors/shaik-abdul-kaleem.jpg'
    },
    duration: '8 weeks',
    totalLessons: 24,
    level: 'Beginner',
    rating: 4.8,
    enrolledStudents: 1245,
    price: 99.99,
    sections: [
      {
        id: 'section-1',
        title: 'Introduction to AI',
        content: [
          {
            id: 'content-1',
            title: 'What is Artificial Intelligence?',
            type: 'video',
            duration: 45,
            isPreviewable: true
          }
        ]
      }
    ],
    syllabus: {
      weeks: [
        {
          title: 'Week 1: Introduction',
          topics: ['AI Overview', 'Basic Concepts', 'Applications']
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Advanced Machine Learning',
    description: 'Dive deep into machine learning algorithms, feature engineering, and model optimization techniques.',
    instructor: 'Prof. Michael Chen',
    level: 'Advanced',
    duration: '10 weeks',
    rating: 4.9,
    students: 876,
    price: 129.99,
    image: '/images/courses/machine-learning.jpg',
    category: 'Machine Learning'
  },
  {
    id: 3,
    title: 'Data Science for Business',
    description: 'Apply data science techniques to solve real-world business problems and drive decision-making.',
    instructor: 'Dr. Emily Rodriguez',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: 4.7,
    students: 1532,
    price: 89.99,
    image: '/images/courses/data-science.jpg',
    category: 'Data Science'
  },
  {
    id: 4,
    title: 'Deep Learning Specialization',
    description: 'Master deep learning techniques including CNNs, RNNs, and transformers for complex AI applications.',
    instructor: 'Dr. James Wilson',
    level: 'Advanced',
    duration: '12 weeks',
    rating: 4.9,
    students: 743,
    price: 149.99,
    image: '/images/courses/deep-learning.jpg',
    category: 'Deep Learning'
  },
  {
    id: 5,
    title: 'Natural Language Processing',
    description: 'Learn to process and analyze text data using modern NLP techniques and build language models.',
    instructor: 'Prof. Lisa Wang',
    level: 'Intermediate',
    duration: '8 weeks',
    rating: 4.8,
    students: 921,
    price: 109.99,
    image: '/images/courses/nlp.jpg',
    category: 'NLP'
  },
  {
    id: 6,
    title: 'Computer Vision Applications',
    description: 'Build applications that can see and understand images using computer vision and deep learning.',
    instructor: 'Dr. Robert Kim',
    level: 'Intermediate',
    duration: '9 weeks',
    rating: 4.7,
    students: 812,
    price: 119.99,
    image: '/images/courses/computer-vision.jpg',
    category: 'Computer Vision'
  }
];

// Course card component
const CourseCard = ({ course }: { course: Course }) => {
  const instructorName = typeof course.instructor === 'string' 
    ? course.instructor 
    : course.instructor.name;

  const studentCount = course.students || course.enrolledStudents || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/courses/${course.id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Alcom+Course';
            }}
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {course.category}
            </span>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <FaUserGraduate className="mr-1" />
              <span>{studentCount} students</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">${course.price}</span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Main Courses Page
const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and levels for filters
  const categories = [...new Set(coursesData.map(course => course.category))];
  const levels = [...new Set(coursesData.map(course => course.level))];

  // Filter courses based on search term and filters
  useEffect(() => {
    let result = [...coursesData]; // Create a copy of the original data
    
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedLevel) {
      result = result.filter(course => course.level === selectedLevel);
    }
    
    if (selectedCategory) {
      result = result.filter(course => course.category === selectedCategory);
    }
    
    setFilteredCourses(result);
  }, [searchTerm, selectedLevel, selectedCategory]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLevel('');
    setSelectedCategory('');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover cutting-edge AI and technology courses designed to help you master the skills of tomorrow.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-white rounded-lg shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Levels</option>
                    {levels.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
        
        {/* Debug information - can be removed after fixing */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">Showing {filteredCourses.length} of {coursesData.length} courses</p>
        </div>
      </div>
    </div>
  );
};

// Export
export default CoursesPage;