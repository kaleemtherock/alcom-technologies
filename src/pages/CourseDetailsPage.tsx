import React from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../data/courseDefinitions';
import { FaClock, FaGraduationCap, FaTools, FaBook } from 'react-icons/fa';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{course.description}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-blue-600">${course.price}</span>
                <p className="text-gray-500">Total Price</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center">
                <FaClock className="text-blue-500 mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <FaGraduationCap className="text-blue-500 mr-2" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center">
                <FaTools className="text-blue-500 mr-2" />
                <span>{course.chapters.length} Chapters</span>
              </div>
            </div>
          </div>

          {/* Prerequisites and Skills */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {course.prerequisites && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                <ul className="list-disc pl-5">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="text-gray-600 mb-2">{prereq}</li>
                  ))}
                </ul>
              </div>
            )}
            {course.skills && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Skills You'll Gain</h2>
                <ul className="list-disc pl-5">
                  {course.skills.map((skill, index) => (
                    <li key={index} className="text-gray-600 mb-2">{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Course Content */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            <div className="space-y-6">
              {course.chapters.map((chapter) => (
                <div key={chapter.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{chapter.title}</h3>
                      <p className="text-gray-600">{chapter.description}</p>
                    </div>
                    <span className="text-blue-500">{chapter.duration}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Topics covered:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {chapter.topics.map((topic, index) => (
                        <li key={index} className="flex items-center">
                          <FaBook className="text-blue-500 mr-2" size={12} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;