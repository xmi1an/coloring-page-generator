import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse flex flex-col items-center justify-center w-full h-64 bg-gray-200 rounded-lg">
      <div className="h-3 w-3/4 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
    </div>
  );
}
