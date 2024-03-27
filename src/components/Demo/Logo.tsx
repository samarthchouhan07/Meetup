import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="text-4xl text-green-600 font-extrabold">𝓜</div>
      <div className="ml-1 italic pt-3 text-xl font-semibold bg-clip-text text-transparent bg-white">MeetUp</div>
    </div>
  );
};

export default Logo;
