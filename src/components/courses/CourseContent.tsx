import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';
import LoadingSpinner from '../common/LoadingSpinner';

interface CourseContentProps {
  courseId: string;
  content: {
    sections: {
      id: string;
      title: string;
      lessons: {
        id: string;
        title: string;
        duration: number;
        completed: boolean;
      }[];
    }[];
  };
}

const CourseContent: React.FC<CourseContentProps> = ({ courseId, content }) => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    loadProgress();
  }, [courseId, user]);

  const loadProgress = async () => {
    if (!user) return;
    try {
      const status = await enrollmentService.getEnrollmentStatus(user.id, courseId);
      setCurrentProgress(status.progress);
      // Initialize completed lessons based on progress
      const completed = new Set(status.completedLessons || []);
      setCompletedLessons(completed);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProgress = (completedCount: number) => {
    const totalLessons = content.sections.reduce(
      (total, section) => total + section.lessons.length,
      0
    );
    return Math.round((completedCount / totalLessons) * 100);
  };

  const handleLessonComplete = async (lessonId: string) => {
    if (!user) return;

    const newCompletedLessons = new Set(completedLessons);
    newCompletedLessons.add(lessonId);
    setCompletedLessons(newCompletedLessons);

    const newProgress = calculateProgress(newCompletedLessons.size);
    setCurrentProgress(newProgress);

    try {
      await enrollmentService.updateProgress(user.id, courseId, newProgress);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Course Progress</h2>
          <span className="text-teal-400">{currentProgress}% Complete</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>

      {content.sections.map((section) => (
        <div key={section.id} className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-4">
          <h3 className="text-lg font-medium text-white mb-4">{section.title}</h3>
          <div className="space-y-2">
            {section.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={completedLessons.has(lesson.id)}
                    onChange={() => handleLessonComplete(lesson.id)}
                    className="rounded border-gray-600 text-teal-500 focus:ring-teal-500 bg-black/50"
                  />
                  <span className="text-gray-300">{lesson.title}</span>
                </div>
                <span className="text-sm text-gray-500">{lesson.duration}min</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseContent;