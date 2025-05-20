import React from 'react';

export const Waiting: React.FC = () => {
  return (
    <div className="text-center">
      <div>some icon</div>
      <p className="text-lg font-medium text-black">Waiting for next song…</p>
    </div>
  );
};