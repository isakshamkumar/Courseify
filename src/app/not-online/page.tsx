// pages/not-online.tsx
import React from 'react';
import Link from 'next/link';

const NotOnline = () => {
  return (
    <div className="container mx-auto text-center mt-16">
      <div className="mb-8 flex justify-center items-center">
        {/* Custom SVG animation for the exclamation circle */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100"
          height="100"
          className="text-red-500 animate-pulse"
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="#ef4444" strokeWidth="3" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-4 animate-bounce">Oops You are Offline</h1>
      <p className="text-gray-600 animate-pulse">
        It seems like you are offline. Please check your internet connection and try again.
      </p>
      <div className="mt-8">
       
       
      </div>
    </div>
  );
};

export default NotOnline;
