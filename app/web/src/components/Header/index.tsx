import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-black text-yellow-400 flex justify-between items-center px-4 py-2">
      <div className="font-bold text-lg">JAMOVEO</div>
      <div className="bg-gray-300 rounded-full w-6 h-6"></div>
    </header>
  );
};
