import pool from '../config/database';
import { ActivityTrackingService } from './ActivityTrackingService';

export interface EnrollmentStatus {
  enrolled: boolean;
  progress: number;
  lastAccessed: Date;
  status: 'active' | 'completed' | 'paused';
}

interface CourseBundle {
  id: string;
  courses: string[];
  required_order: boolean;
}

export const enrollmentService = {
  async enrollInCourse(userId: string, courseId: string) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Check if already enrolled
      const existing = await client.query(
        'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
        [userId, courseId]
      );

      if (existing.rows.length > 0) {
        throw new Error('Already enrolled in this course');
      }

      const result = await client.query(
        `INSERT INTO enrollments (user_id, course_id, status, progress, enrolled_at)
         VALUES ($1, $2, 'active', 0, CURRENT_TIMESTAMP)
         RETURNING *`,
        [userId, courseId]
      );

      await ActivityTrackingService.logActivity(userId, 'course_enrollment', {
        courseId,
        action: 'enrolled'
      });

      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async getEnrollmentStatus(userId: string, courseId: string): Promise<EnrollmentStatus> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT status, progress, last_accessed
         FROM enrollments
         WHERE user_id = $1 AND course_id = $2`,
        [userId, courseId]
      );

      if (!result.rows[0]) {
        return {
          enrolled: false,
          progress: 0,
          lastAccessed: new Date(),
          status: 'paused'
        };
      }

      return {
        enrolled: true,
        progress: result.rows[0].progress,
        lastAccessed: result.rows[0].last_accessed,
        status: result.rows[0].status
      };
    } finally {
      client.release();
    }
  },

  async updateProgress(userId: string, courseId: string, progress: number) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `UPDATE enrollments
         SET progress = $1,
             last_accessed = CURRENT_TIMESTAMP,
             status = CASE 
               WHEN $1 >= 100 THEN 'completed'
               ELSE 'active'
             END
         WHERE user_id = $2 AND course_id = $3
         RETURNING *`,
        [progress, userId, courseId]
      );

      await ActivityTrackingService.logActivity(userId, 'course_progress', {
        courseId,
        progress,
        action: progress >= 100 ? 'completed' : 'progress_update'
      });

      return result.rows[0];
    } finally {
      client.release();
    }
  }, // Add comma here

  async getBundlesForCourse(courseId: string): Promise<CourseBundle[]> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT * FROM course_bundles 
         WHERE $1 = ANY(courses)`,
        [courseId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  },

  async enrollInBundle(userId: string, bundleId: string) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const bundle = await client.query(
        'SELECT * FROM course_bundles WHERE id = $1',
        [bundleId]
      );

      if (!bundle.rows[0]) {
        throw new Error('Bundle not found');
      }

      for (const courseId of bundle.rows[0].courses) {
        await this.enrollInCourse(userId, courseId);
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async checkPrerequisites(userId: string, courseId: string): Promise<boolean> {
    const client = await pool.connect();
    try {
      const prerequisites = await client.query(
        `SELECT prerequisite_id FROM course_prerequisites 
         WHERE course_id = $1`,
        [courseId]
      );

      for (const prereq of prerequisites.rows) {
        const completion = await client.query(
          `SELECT status FROM enrollments 
           WHERE user_id = $1 AND course_id = $2 
           AND status = 'completed'`,
          [userId, prereq.prerequisite_id]
        );

        if (!completion.rows[0]) {
          return false;
        }
      }

      return true;
    } finally {
      client.release();
    }
  }
};