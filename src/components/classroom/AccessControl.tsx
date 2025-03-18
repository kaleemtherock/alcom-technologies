import React, { useState } from 'react';
import { FaUserPlus, FaUserMinus, FaClock, FaCheck } from 'react-icons/fa';

interface AccessControlProps {
  documentId: string;
  onGrantAccess: (userId: string, settings: ShareSettings) => void;
  onRevokeAccess: (userId: string) => void;
}

const AccessControl = ({ documentId, onGrantAccess, onRevokeAccess }: AccessControlProps) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [accessSettings, setAccessSettings] = useState({
    canEdit: true,
    canComment: true,
    expiresAt: undefined as Date | undefined
  });

  const handleGrantAccess = () => {
    if (selectedUser) {
      onGrantAccess(selectedUser, accessSettings);
      setSelectedUser('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Access Control</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">User</label>
          <input
            type="email"
            placeholder="Enter user email"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={accessSettings.canEdit}
              onChange={(e) => setAccessSettings(prev => ({
                ...prev,
                canEdit: e.target.checked
              }))}
              className="mr-2"
            />
            Can Edit
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={accessSettings.canComment}
              onChange={(e) => setAccessSettings(prev => ({
                ...prev,
                canComment: e.target.checked
              }))}
              className="mr-2"
            />
            Can Comment
          </label>
        </div>
        <button
          onClick={handleGrantAccess}
          className="w-full py-2 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2"
        >
          <FaUserPlus /> Grant Access
        </button>
      </div>
    </div>
  );
};

export default AccessControl;