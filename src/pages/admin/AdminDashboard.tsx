import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Course Management</h2>
          <ul className="space-y-2">
            <li>View All Courses</li>
            <li>Add New Course</li>
            <li>Manage Enrollments</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <ul className="space-y-2">
            <li>View All Users</li>
            <li>Manage Roles</li>
            <li>User Analytics</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <ul className="space-y-2">
            <li>Course Performance</li>
            <li>User Engagement</li>
            <li>Revenue Reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;