import pool from '../config/database';
import { generatePDF } from '../utils/pdfGenerator';

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  issued_date: Date;
  certificate_number: string;
  completion_status: 'completed' | 'distinction';
}

export const certificateService = {
  async generateCertificate(userId: string, courseId: string): Promise<Certificate> {
    const client = await pool.connect();
    try {
      // Verify course completion
      const enrollment = await client.query(
        `SELECT progress, final_score FROM enrollments 
         WHERE user_id = $1 AND course_id = $2`,
        [userId, courseId]
      );

      if (!enrollment.rows[0] || enrollment.rows[0].progress < 100) {
        throw new Error('Course not completed');
      }

      // Generate unique certificate number
      const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create certificate record
      const result = await client.query(
        `INSERT INTO certificates (user_id, course_id, certificate_number, completion_status)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [userId, courseId, certificateNumber, 
         enrollment.rows[0].final_score >= 90 ? 'distinction' : 'completed']
      );

      return result.rows[0];
    } finally {
      client.release();
    }
  },

  async getCertificate(userId: string, courseId: string): Promise<Certificate | null> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT * FROM certificates 
         WHERE user_id = $1 AND course_id = $2`,
        [userId, courseId]
      );
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }
};