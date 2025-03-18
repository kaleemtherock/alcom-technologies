import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaCheck } from 'react-icons/fa';

interface EnrollmentFlowProps {
  course: {
    id: string;
    title: string;
    price: number;
  };
  onClose: () => void;
  onEnrollmentComplete: () => void;
}

const EnrollmentFlow = ({ course, onClose, onEnrollmentComplete }: EnrollmentFlowProps) => {
  const [step, setStep] = useState<'payment' | 'confirmation'>('payment');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  const handleEnrollment = async () => {
    try {
      // Here you would integrate with your payment processing service
      // For now, we'll simulate a successful enrollment
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('confirmation');
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {step === 'payment' ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Enroll in {course.title}</h2>
            <div className="mb-6">
              <p className="text-gray-600">Course Price</p>
              <p className="text-3xl font-bold">${course.price}</p>
            </div>

            <div className="space-y-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 border rounded-lg flex items-center ${
                  paymentMethod === 'card' ? 'border-blue-600' : ''
                }`}
              >
                <FaCreditCard className="mr-3" />
                Credit/Debit Card
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`w-full p-4 border rounded-lg flex items-center ${
                  paymentMethod === 'paypal' ? 'border-blue-600' : ''
                }`}
              >
                <FaPaypal className="mr-3" />
                PayPal
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEnrollment}
                className="flex-1 py-2 bg-blue-600 text-white rounded"
              >
                Pay Now
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Enrollment Successful!</h2>
            <p className="text-gray-600 mb-6">You can now access the course content</p>
            <button
              onClick={onEnrollmentComplete}
              className="w-full py-2 bg-blue-600 text-white rounded"
            >
              Start Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentFlow;