import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { enrollmentService, EnrollmentStatus } from '../../services/enrollmentService';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    instructor: string;
    duration: string;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { user } = useAuth();
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus | null>(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (user) {
        try {
          const status = await enrollmentService.getEnrollmentStatus(user.id, course.id);
          setEnrollmentStatus(status);
        } catch (error) {
          console.error('Error checking enrollment:', error);
        }
      }
    };

    checkEnrollment();
  }, [user, course.id]);

  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition duration-300">
      <div className="relative aspect-video">
        <img
          src={course.thumbnail_url}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {enrollmentStatus?.enrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${enrollmentStatus.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>{course.instructor}</span>
          <span>{course.duration}</span>
        </div>

        {enrollmentStatus?.enrolled ? (
          <Link
            to={`/courses/${course.id}/learn`}
            className="block w-full text-center py-2 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-500 hover:to-cyan-500"
          >
            {enrollmentStatus.status === 'completed' ? (
              'Review Course'
            ) : (
              <>Continue Learning ({enrollmentStatus.progress}%)</>
            )}
          </Link>
        ) : (
          <Link
            to={`/courses/${course.id}`}
            className="block w-full text-center py-2 px-4 border border-white/20 text-white rounded-lg hover:bg-white/5"
          >
            View Course
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;