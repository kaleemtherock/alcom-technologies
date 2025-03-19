import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';

interface ActivityLog {
  id: string;
  userId: string;
  action: string;  // Made more flexible to accommodate course actions
  timestamp: Date;
  metadata: Record<string, any>;
}

export class ActivityTrackingService {
  static async logActivity(userId: string, action: string, metadata: Record<string, any>) {
    const client = await pool.connect();
    try {
      const activityId = uuidv4();
      await client.query(
        `INSERT INTO activity_logs (id, user_id, action, metadata, created_at)
         VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
         RETURNING *`,
        [activityId, userId, action, metadata]
      );
      return activityId;
    } finally {
      client.release();
    }
  }

  static async getActivities(filters?: {
    userId?: string;
    action?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const client = await pool.connect();
    try {
      let query = 'SELECT * FROM activity_logs WHERE 1=1';
      const params: any[] = [];
      let paramCount = 1;

      if (filters?.userId) {
        query += ` AND user_id = $${paramCount++}`;
        params.push(filters.userId);
      }
      if (filters?.action) {
        query += ` AND action = $${paramCount++}`;
        params.push(filters.action);
      }
      if (filters?.startDate) {
        query += ` AND created_at >= $${paramCount++}`;
        params.push(filters.startDate);
      }
      if (filters?.endDate) {
        query += ` AND created_at <= $${paramCount++}`;
        params.push(filters.endDate);
      }

      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }
}