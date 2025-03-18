import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Course } from '../types/course';

interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      // For development, let's add some mock data
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Introduction to Web Development',
          description: 'Learn the basics of web development',
          instructor: {
            name: 'John Doe',
            expertise: 'Web Development',
            avatar: 'https://via.placeholder.com/150'
          },
          duration: '8 weeks',
          totalLessons: 24,
          level: 'Beginner',
          rating: 4.5,
          enrolledStudents: 150,
          price: 99.99,
          startDate: new Date(),
          tags: ['web', 'javascript', 'html', 'css'],
          sections: [
            {
              id: 's1',
              title: 'Getting Started',
              content: [
                {
                  id: 'c1',
                  title: 'Introduction to HTML',
                  type: 'video',
                  duration: 15,
                  isPreviewable: true
                }
              ]
            }
          ],
          syllabus: {
            weeks: [
              {
                title: 'HTML Basics',
                topics: ['HTML Structure', 'Tags', 'Attributes']
              }
            ]
          }
        }
      ];

      setCourses(mockCourses);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, error, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};