import React from 'react';
import { FaChartLine, FaUserFriends, FaClock, FaCalendar, FaDownload } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  totalEdits: number;
  uniqueUsers: number;
  averageEditTime: number;
  activeHours: { hour: number; count: number }[];
  userActivity: { user: string; edits: number }[];
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

const AnalyticsDashboard = ({ data }: AnalyticsDashboardProps) => {
  const exportData = (format: 'csv' | 'json' | 'pdf') => {
    // Implementation for data export
  };

  const activityChartData = {
    labels: data.activeHours.map(h => `${h.hour}:00`),
    datasets: [{
      label: 'Activity by Hour',
      data: data.activeHours.map(h => h.count),
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.1
    }]
  };

  const userActivityChartData = {
    labels: data.userActivity.map(u => u.user),
    datasets: [{
      data: data.userActivity.map(u => u.edits),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ]
    }]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Document Analytics</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaChartLine className="text-blue-500" />
            <h3 className="font-medium">Total Edits</h3>
          </div>
          <p className="text-3xl font-bold text-blue-700">{data.totalEdits}</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaUserFriends className="text-green-500" />
            <h3 className="font-medium">Unique Users</h3>
          </div>
          <p className="text-3xl font-bold text-green-700">{data.uniqueUsers}</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaClock className="text-purple-500" />
            <h3 className="font-medium">Avg. Edit Time</h3>
          </div>
          <p className="text-3xl font-bold text-purple-700">
            {Math.round(data.averageEditTime)}min
          </p>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaCalendar className="text-orange-500" />
            <h3 className="font-medium">Peak Hours</h3>
          </div>
          <p className="text-3xl font-bold text-orange-700">
            {data.activeHours.reduce((max, curr) => 
              curr.count > max.count ? curr : max
            ).hour}:00
          </p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">User Activity</h3>
        <div className="space-y-3">
          {data.userActivity.map(user => (
            <div key={user.user} className="flex items-center gap-4">
              <span className="w-32 truncate">{user.user}</span>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${(user.edits / data.totalEdits) * 100}%`
                  }}
                />
              </div>
              <span className="text-sm text-gray-600">{user.edits} edits</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;