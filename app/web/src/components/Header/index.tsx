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
      <div className='flex flex-row px-4 py-2'>
        <img src='/images/Icon.png' />
        <div className="font-bold text-lg px-4">JAMOVEO</div>
      </div>
      <div className='px-4'>
        <button onClick={() => onLogout()}>logout</button>
      </div>
    </header>
  );
};
