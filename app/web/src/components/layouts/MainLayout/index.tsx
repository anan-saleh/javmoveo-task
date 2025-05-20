import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../Header';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffbee] flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
