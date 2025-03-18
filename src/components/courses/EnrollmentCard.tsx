import React from 'react';
import { Link } from 'react-router-dom';

interface EnrollmentCardProps {
  enrollment: {
    course_id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    progress: number;
    status: string;
    last_accessed: Date;
  };
}

const EnrollmentCard: React.FC<EnrollmentCardProps> = ({ enrollment }) => {
  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={enrollment.thumbnail_url}
          alt={enrollment.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
            style={{ width: `${enrollment.progress}%` }}
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{enrollment.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {enrollment.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Progress: {enrollment.progress}%
          </span>
          <Link
            to={`/courses/${enrollment.course_id}`}
            className="text-sm text-teal-500 hover:text-teal-400"
          >
            {enrollment.status === 'completed' ? 'Review Course' : 'Continue Learning'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;