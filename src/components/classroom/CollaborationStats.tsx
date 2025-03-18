import React from 'react';
import { FaUsers, FaEdit, FaClock, FaFileExport } from 'react-icons/fa';

interface CollaborationStatsProps {
  documentId: string;
  stats: {
    lastEdited: Date;
    activeUsers: string[];
    totalEdits: number;
    collaboratorCount: number;
    editCount: number;
  };
  onExport: (format: 'pdf' | 'docx' | 'html') => void;
}

const CollaborationStats = ({ documentId, stats, onExport }: CollaborationStatsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <FaUsers className="text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Active Users</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">{stats.activeUsers.length}</p>
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <FaEdit className="text-green-500" />
            <span className="text-sm font-medium text-green-700">Total Edits</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-1">{stats.totalEdits}</p>
        </div>

        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <FaUsers className="text-purple-500" />
            <span className="text-sm font-medium text-purple-700">Collaborators</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-1">{stats.collaboratorCount}</p>
        </div>

        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <FaClock className="text-yellow-500" />
            <span className="text-sm font-medium text-yellow-700">Last Edit</span>
          </div>
          <p className="text-sm font-medium text-yellow-900 mt-1">
            {stats.lastEdited.toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Export Document</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => onExport('pdf')}
            className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            <FaFileExport className="mr-2" /> PDF
          </button>
          <button
            onClick={() => onExport('docx')}
            className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            <FaFileExport className="mr-2" /> DOCX
          </button>
          <button
            onClick={() => onExport('html')}
            className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            <FaFileExport className="mr-2" /> HTML
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationStats;