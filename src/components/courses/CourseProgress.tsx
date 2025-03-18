import React from 'react';
import { FaCheckCircle, FaPlayCircle, FaClock } from 'react-icons/fa';

interface CourseProgressProps {
  courseId: string;
  progress: {
    completedLessons: number;
    totalLessons: number;
    lastAccessedLesson: string;
    timeSpent: number;
    nextLesson: {
      id: string;
      title: string;
      duration: number;
    };
  };
  onContinue: (lessonId: string) => void;
}

const CourseProgress = ({ courseId, progress, onContinue }: CourseProgressProps) => {
  const completionPercentage = (progress.completedLessons / progress.totalLessons) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Your Progress</h3>
        <span className="text-2xl font-bold text-blue-600">
          {completionPercentage.toFixed(0)}%
        </span>
      </div>

      <div className="space-y-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>{progress.completedLessons} of {progress.totalLessons} lessons completed</span>
          <span>{Math.floor(progress.timeSpent / 60)}h {progress.timeSpent % 60}m spent</span>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Continue Learning</h4>
          <button
            onClick={() => onContinue(progress.nextLesson.id)}
            className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
          >
            <div className="flex items-center">
              <FaPlayCircle className="text-blue-600 mr-3" />
              <div>
                <p className="font-medium">{progress.nextLesson.title}</p>
                <p className="text-sm text-gray-600">Next Lesson</p>
              </div>
            </div>
            <span className="text-sm text-gray-600">
              {Math.floor(progress.nextLesson.duration / 60)}:{(progress.nextLesson.duration % 60).toString().padStart(2, '0')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;