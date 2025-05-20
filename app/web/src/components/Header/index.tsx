import React from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = async () => {
    await logout();
    navigate('/');
  }
  return (
    <header className="bg-black text-yellow-400 flex justify-between items-center px-4 py-2">
      <div className="font-bold text-lg">JAMOVEO</div>
      <div className="bg-gray-300 rounded-full w-6 h-6"></div>
      <button onClick={() => onLogout()}>logout</button>
    </header>
  );
};
