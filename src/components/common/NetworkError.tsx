import React from 'react';
import { FaWifi, FaRedoAlt } from 'react-icons/fa';

interface NetworkErrorProps {
  message?: string;
  onRetry?: () => void;
}

const NetworkError: React.FC<NetworkErrorProps> = ({
  message = 'Unable to connect to the server',
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <FaWifi className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaRedoAlt className="mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default NetworkError;