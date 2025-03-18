import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-white/10 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-white mb-4">Session Expired</h2>
        <p className="text-gray-300 mb-6">
          Your session has expired. Please sign in again to continue.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-500 hover:to-cyan-500"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;