import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-lg text-green-600"></span>

        <p className="text-sm font-medium text-gray-500">
          লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;