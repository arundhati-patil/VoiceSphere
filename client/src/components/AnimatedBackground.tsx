import React from 'react';
// Import the image from attached assets
const speakerImage = '/attached_assets/45853bfa-7aee-4f8a-8d59-3f4be1417348.jpeg';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-56 h-56 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-2/3 left-1/3 w-48 h-48 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
      
      {/* Concert/Speaker image with overlay */}
      <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none h-96 w-96 overflow-hidden">
        <img 
          src={speakerImage} 
          alt="Speaker" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
