import React, { useState } from 'react';

const TestErrorComponent = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Test Error');
  }

  return (
    <div className="p-4">
      <button 
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => setThrowError(true)}
      >
        Trigger Error
      </button>
    </div>
  );
};

export default TestErrorComponent;