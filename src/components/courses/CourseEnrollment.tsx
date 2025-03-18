import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';
import LoadingSpinner from '../common/LoadingSpinner';

interface CourseEnrollmentProps {
  courseId: string;
  onEnrollmentChange?: (status: EnrollmentStatus) => void;
}

const CourseEnrollment: React.FC<CourseEnrollmentProps> = ({ courseId, onEnrollmentChange }) => {
  const { user } = useAuth();
  const [bundles, setBundles] = useState<CourseBundle[]>([]);
  const [prerequisites, setPrerequisites] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEnrollmentOptions();
  }, [courseId, user]);

  const loadEnrollmentOptions = async () => {
    if (!user) return;
    try {
      const [bundleData, prereqCheck] = await Promise.all([
        enrollmentService.getBundlesForCourse(courseId),
        enrollmentService.checkPrerequisites(user.id, courseId)
      ]);
      setBundles(bundleData);
      setPrerequisites(prereqCheck);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async (bundleId?: string) => {
    if (!user) return;
    setIsLoading(true);
    setError('');

    try {
      if (bundleId) {
        await enrollmentService.enrollInBundle(user.id, bundleId);
      } else {
        await enrollmentService.enrollInCourse(user.id, courseId);
      }
      // Refresh enrollment status
      const status = await enrollmentService.getEnrollmentStatus(user.id, courseId);
      onEnrollmentChange?.(status);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!prerequisites) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-400 px-4 py-3 rounded">
        Please complete the prerequisite courses before enrolling.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <button
        onClick={() => handleEnroll()}
        className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-500 hover:to-cyan-500"
      >
        Enroll in This Course
      </button>

      {bundles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-white font-medium mb-2">Available Course Bundles:</h3>
          <div className="space-y-2">
            {bundles.map(bundle => (
              <button
                key={bundle.id}
                onClick={() => handleEnroll(bundle.id)}
                className="w-full py-2 px-4 border border-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/10"
              >
                Enroll in Bundle {bundle.required_order ? '(Sequential)' : '(Flexible)'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEnrollment;