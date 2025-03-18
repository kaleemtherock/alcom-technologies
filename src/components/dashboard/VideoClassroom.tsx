import React from 'react';
import { FaArrowLeft, FaComments, FaUsers, FaHandPaper, FaMicrophone, FaVideo, FaDesktop } from 'react-icons/fa';
import { Course } from '../../types/course';

interface Course {
  id: string;
  title: string;
  nextClass: Date;
  progress: number;
  instructor: string;
}

interface VideoClassroomProps {
  course: Course;
  onLeave: () => void;
}

const VideoClassroom: React.FC<VideoClassroomProps> = ({ course, onLeave }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLeave}
              className="text-gray-300 hover:text-white"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold">{course.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-red-500">● LIVE</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 grid grid-cols-4 gap-4 h-[calc(100vh-80px)]">
        {/* Video Grid */}
        <div className="col-span-3 grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg aspect-video">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">{course.instructor[0]}</span>
                </div>
                <p>{course.instructor}</p>
                <p className="text-sm text-gray-400">Instructor</p>
              </div>
            </div>
          </div>
          {[1, 2, 3].map((student) => (
            <div key={student} className="bg-gray-800 rounded-lg aspect-video">
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">S{student}</span>
                  </div>
                  <p>Student {student}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat and Participants */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex space-x-2 mb-4">
            <button className="flex-1 py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600">
              <FaComments className="mx-auto" />
            </button>
            <button className="flex-1 py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600">
              <FaUsers className="mx-auto" />
            </button>
          </div>
          <div className="h-[calc(100%-120px)] overflow-y-auto">
            <div className="space-y-4">
              <p className="text-gray-400 text-center text-sm">Class started</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-center space-x-4">
          <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
            <FaMicrophone />
          </button>
          <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
            <FaVideo />
          </button>
          <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
            <FaHandPaper />
          </button>
          <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
            <FaDesktop />
          </button>
          <button 
            onClick={onLeave}
            className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Leave Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoClassroom;