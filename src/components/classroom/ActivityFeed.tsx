import React from 'react';
import { FaEdit, FaComment, FaShare, FaDownload } from 'react-icons/fa';

interface Activity {
  id: string;
  type: 'edit' | 'comment' | 'share' | 'export';
  user: string;
  timestamp: Date;
  details: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'edit': return <FaEdit className="text-blue-500" />;
      case 'comment': return <FaComment className="text-green-500" />;
      case 'share': return <FaShare className="text-purple-500" />;
      case 'export': return <FaDownload className="text-orange-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <div className="p-2 bg-gray-100 rounded-full">
              {getActivityIcon(activity.type)}
            </div>
            <div>
              <p className="font-medium">{activity.user}</p>
              <p className="text-sm text-gray-600">{activity.details}</p>
              <p className="text-xs text-gray-400">
                {activity.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;