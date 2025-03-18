import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { certificateService, Certificate } from '../../services/certificateService';
import LoadingSpinner from '../common/LoadingSpinner';

interface CertificateProps {
  courseId: string;
  courseName: string;
}

const CertificateComponent: React.FC<CertificateProps> = ({ courseId, courseName }) => {
  const { user } = useAuth();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCertificate();
  }, [courseId, user]);

  const loadCertificate = async () => {
    if (!user) return;
    try {
      const cert = await certificateService.getCertificate(user.id, courseId);
      setCertificate(cert);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCertificate = async () => {
    if (!user) return;
    setIsLoading(true);
    setError('');

    try {
      const newCertificate = await certificateService.generateCertificate(user.id, courseId);
      setCertificate(newCertificate);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Course Certificate</h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {certificate ? (
        <div className="space-y-4">
          <div className="p-6 border border-teal-500/20 rounded-lg bg-teal-500/5">
            <h3 className="text-xl font-semibold text-white mb-2">
              Certificate of Completion
            </h3>
            <p className="text-gray-400">
              This certifies that <span className="text-white">{user?.name}</span> has
              successfully completed the course:
            </p>
            <p className="text-xl text-teal-400 my-4">{courseName}</p>
            <div className="text-sm text-gray-400 space-y-2">
              <p>Certificate Number: {certificate.certificate_number}</p>
              <p>Issued Date: {new Date(certificate.issued_date).toLocaleDateString()}</p>
              <p>Status: {certificate.completion_status}</p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-500 hover:to-cyan-500"
          >
            Download Certificate
          </button>
        </div>
      ) : (
        <button
          onClick={handleGenerateCertificate}
          className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-500 hover:to-cyan-500"
        >
          Generate Certificate
        </button>
      )}
    </div>
  );
};

export default CertificateComponent;