import { v4 as uuidv4 } from 'uuid';

interface ActivityLog {
  id: string;
  userId: string;
  action: 'view' | 'edit' | 'comment' | 'share' | 'download';
  timestamp: Date;
  metadata: Record<string, any>;
}

class ActivityTrackingService {
  private activities: ActivityLog[] = [];

  logActivity(userId: string, action: ActivityLog['action'], metadata: Record<string, any>) {
    const activity: ActivityLog = {
      id: uuidv4(),
      userId,
      action,
      timestamp: new Date(),
      metadata
    };
    this.activities.push(activity);
    this.syncWithServer(activity);
  }

  private syncWithServer(activity: ActivityLog) {
    // Implementation for server sync
  }

  getActivities(filters?: {
    userId?: string;
    action?: ActivityLog['action'];
    startDate?: Date;
    endDate?: Date;
  }) {
    let filtered = [...this.activities];
    
    if (filters?.userId) {
      filtered = filtered.filter(a => a.userId === filters.userId);
    }
    if (filters?.action) {
      filtered = filtered.filter(a => a.action === filters.action);
    }
    if (filters?.startDate) {
      filtered = filtered.filter(a => a.timestamp >= filters.startDate!);
    }
    if (filters?.endDate) {
      filtered = filtered.filter(a => a.timestamp <= filters.endDate!);
    }
    
    return filtered;
  }
}

export default ActivityTrackingService;