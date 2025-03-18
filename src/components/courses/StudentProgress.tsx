import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';

interface Progress {
  studentId: string;
  studentName: string;
  completedModules: number;
  totalModules: number;
  assignments: {
    id: string;
    title: string;
    status: 'completed' | 'pending' | 'overdue';
    grade?: number;
    dueDate: Date;
  }[];
  weeklyEngagement: {
    week: string;
    minutes: number;
  }[];
  performanceTrend: {
    assignment: string;
    score: number;
  }[];
}

interface StudentProgressProps {
  progress: Progress;
}

const StudentProgress = ({ progress }: StudentProgressProps) => {
  const completionRate = (progress.completedModules / progress.totalModules) * 100;

  const engagementData = {
    labels: progress.weeklyEngagement.map(w => w.week),
    datasets: [{
      label: 'Minutes Spent',
      data: progress.weeklyEngagement.map(w => w.minutes),
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.1
    }]
  };

  const performanceData = {
    labels: progress.performanceTrend.map(p => p.assignment),
    datasets: [{
      label: 'Assignment Scores',
      data: progress.performanceTrend.map(p => p.score),
      backgroundColor: 'rgb(59, 130, 246)'
    }]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{progress.studentName}'s Progress</h2>
          <div className="flex items-center">
            <div className="h-2 w-32 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {completionRate.toFixed(0)}% Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500" />
              <span>Completed</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {progress.completedModules}/{progress.totalModules}
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-yellow-500" />
              <span>Pending</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {progress.assignments.filter(a => a.status === 'pending').length}
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FaClock className="text-red-500" />
              <span>Overdue</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {progress.assignments.filter(a => a.status === 'overdue').length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-medium mb-4">Weekly Engagement</h3>
          <Line data={engagementData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-medium mb-4">Performance Trend</h3>
          <Bar data={performanceData} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-medium mb-4">Assignment Status</h3>
        <div className="space-y-4">
          {progress.assignments.map(assignment => (
            <div
              key={assignment.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{assignment.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {assignment.grade && (
                  <span className="font-medium">{assignment.grade}%</span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm ${
                  assignment.status === 'completed' ? 'bg-green-100 text-green-700' :
                  assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {assignment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-medium mb-4">Learning Objectives</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Course Materials Completion</span>
            <div className="flex items-center">
              <div className="h-2 w-24 bg-gray-200 rounded-full mr-2">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{completionRate.toFixed(0)}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Assignment Completion</span>
            <div className="flex items-center">
              <div className="h-2 w-24 bg-gray-200 rounded-full mr-2">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ 
                    width: `${(progress.assignments.filter(a => a.status === 'completed').length / 
                    progress.assignments.length) * 100}%` 
                  }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {((progress.assignments.filter(a => a.status === 'completed').length / 
                progress.assignments.length) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;