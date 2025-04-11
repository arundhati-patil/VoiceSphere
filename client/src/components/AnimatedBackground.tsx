import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-56 h-56 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-2/3 left-1/3 w-48 h-48 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
    </div>
  );
};

export default AnimatedBackground;
