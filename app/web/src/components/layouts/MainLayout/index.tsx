import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../Header';

interface MainLayoutProps {
    isAdmin?: boolean
}

export const MainLayout: React.FC<MainLayoutProps> = ({ isAdmin }) => {
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
