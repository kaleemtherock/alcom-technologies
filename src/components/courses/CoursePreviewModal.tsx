import React from 'react';
import { FaPlay, FaBook, FaClock, FaUsers, FaStar } from 'react-icons/fa';
import CourseProgress from './CourseProgress';
import CourseContentPreview from './CourseContentPreview';
import CourseShare from './CourseShare';
import { Course } from '../../types/course';

interface CoursePreviewModalProps {
  course: Course;
  onClose: () => void;
  onEnroll: () => void;
}

const CoursePreviewModal = ({ course, onClose, onEnroll }: CoursePreviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <p className="text-gray-600 mb-6">{course.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <FaClock className="text-blue-500 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <FaBook className="text-blue-500 mr-2" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-blue-500 mr-2" />
                  <span>{course.enrolledStudents} students</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-2" />
                  <span>{course.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Course Syllabus</h3>
                <div className="space-y-4">
                  {course.syllabus.weeks.map((week, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Week {index + 1}: {week.title}</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {week.topics.map((topic, topicIndex) => (
                          <li key={topicIndex}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <CourseContentPreview
              sections={course.sections}
              onPreviewContent={(contentId) => {
                console.log('Preview content:', contentId);
              }}
            />

            {course.enrolled && course.progress && (
              <CourseProgress
                courseId={course.id}
                progress={course.progress}
                onContinue={(lessonId) => {
                  console.log('Continue to lesson:', lessonId);
                }}
              />
            )}
          </div>

          <div className="border-l pl-6">
            <div className="sticky top-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{course.instructor.name}</h4>
                  <p className="text-gray-600">{course.instructor.expertise}</p>
                </div>
              </div>

              <button
                onClick={onEnroll}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
              >
                Enroll Now
              </button>

              <button
                className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2"
              >
                <FaPlay />
                Watch Preview
              </button>
            </div>
            <CourseShare
              course={{
                id: course.id,
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail || ''
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewModal;