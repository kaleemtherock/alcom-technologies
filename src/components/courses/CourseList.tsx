import React from 'react';
import { FaUsers, FaCalendar, FaEdit, FaTrash } from 'react-icons/fa';
import { Course } from '../../services/CourseService';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
  onEnroll: (courseId: string) => void;
}

const CourseList = ({ courses, onEdit, onDelete, onEnroll }: CourseListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {course.thumbnail && (
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-500">
                <FaUsers className="mr-2" />
                <span>{course.enrolled}/{course.capacity}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FaCalendar className="mr-2" />
                <span>{new Date(course.startDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => onEnroll(course.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={course.enrolled >= course.capacity}
              >
                {course.enrolled >= course.capacity ? 'Full' : 'Enroll'}
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(course)}
                  className="p-2 text-gray-600 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(course.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;