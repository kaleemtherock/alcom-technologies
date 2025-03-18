import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { FaUserGraduate, FaClock, FaChartLine } from 'react-icons/fa';

interface AnalyticsData {
  totalStudents: number;
  completionRate: number;
  averageEngagement: number;
  weeklyActivity: {
    week: string;
    active: number;
    completed: number;
  }[];
  contentEngagement: {
    type: string;
    count: number;
  }[];
}

interface CourseAnalyticsProps {
  courseId: string;
  data: AnalyticsData;
}

const CourseAnalytics = ({ courseId, data }: CourseAnalyticsProps) => {
  const weeklyData = {
    labels: data.weeklyActivity.map(w => w.week),
    datasets: [
      {
        label: 'Active Students',
        data: data.weeklyActivity.map(w => w.active),
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      },
      {
        label: 'Completed Activities',
        data: data.weeklyActivity.map(w => w.completed),
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.1
      }
    ]
  };

  const engagementData = {
    labels: data.contentEngagement.map(c => c.type),
    datasets: [{
      data: data.contentEngagement.map(c => c.count),
      backgroundColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(244, 63, 94)'
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2">
            <FaUserGraduate className="text-blue-500 text-xl" />
            <h3 className="font-medium">Total Students</h3>
          </div>
          <p className="text-3xl font-bold">{data.totalStudents}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2">
            <FaChartLine className="text-green-500 text-xl" />
            <h3 className="font-medium">Completion Rate</h3>
          </div>
          <p className="text-3xl font-bold">{data.completionRate}%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2">
            <FaClock className="text-purple-500 text-xl" />
            <h3 className="font-medium">Avg. Engagement</h3>
          </div>
          <p className="text-3xl font-bold">{data.averageEngagement}h</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium mb-4">Weekly Activity</h3>
          <Line data={weeklyData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium mb-4">Content Engagement</h3>
          <Doughnut data={engagementData} />
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics;