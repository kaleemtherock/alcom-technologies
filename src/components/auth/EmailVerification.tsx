import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/userService';
import LoadingSpinner from '../common/LoadingSpinner';

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await verifyEmail(token!);
        setSuccess(true);
        setTimeout(() => {
          navigate('/login', {
            state: { message: 'Email verified successfully. Please sign in.' }
          });
        }, 3000);
      } catch (err: any) {
        setError(err.message || 'Failed to verify email');
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserEmail();
  }, [token, navigate]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10">
        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Email Verified!</h2>
            <p className="text-gray-400">
              Your email has been verified successfully. Redirecting to login...
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Verification Failed</h2>
            <p className="text-gray-400">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-6 w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;