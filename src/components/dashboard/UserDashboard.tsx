import React, { useState } from 'react';
import { FaVideo, FaBook, FaChartLine, FaCertificate, FaCalendar, FaPlay } from 'react-icons/fa';
import VideoClassroom from './VideoClassroom';

// Remove the local Course interface and import the main one
import { Course } from '../../types/course';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isInClass, setIsInClass] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const joinClass = (course: Course) => {
    setSelectedCourse(course);
    setIsInClass(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isInClass ? (
        <VideoClassroom
          course={selectedCourse!}
          onLeave={() => setIsInClass(false)}
        />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Learning Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Next Class</h3>
                <FaCalendar className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">In 2 hours</p>
              <p className="text-gray-600">Advanced Deep Learning</p>
              <button
                onClick={() => joinClass({
                  id: 'dl-001',
                  title: 'Advanced Deep Learning',
                  nextClass: new Date(),
                  progress: 45,
                  instructor: 'Dr. Smith'
                })}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Join Class
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Course Progress</h3>
                <FaChartLine className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">45%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Completed Modules</h3>
                <FaCertificate className="text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">3/8</p>
              <p className="text-gray-600">Keep going!</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="border-b">
              <nav className="flex">
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'upcoming'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming Classes
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'recorded'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('recorded')}
                >
                  Recorded Sessions
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'upcoming' ? (
                <div className="space-y-4">
                  {/* Upcoming classes list */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Neural Networks Architecture</h4>
                      <p className="text-sm text-gray-600">Tomorrow, 10:00 AM</p>
                    </div>
                    <button
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => joinClass({
                        id: 'dl-002',
                        title: 'Neural Networks Architecture',
                        nextClass: new Date(),
                        progress: 0,
                        instructor: 'Dr. Johnson'
                      })}
                    >
                      <FaVideo className="mr-2" />
                      Join
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Recorded sessions list */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Introduction to Deep Learning</h4>
                      <p className="text-sm text-gray-600">Recorded on May 15, 2024</p>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      <FaPlay className="mr-2" />
                      Watch
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;