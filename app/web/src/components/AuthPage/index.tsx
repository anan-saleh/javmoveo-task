import React from 'react';
import { useMatch } from 'react-router-dom';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { useTailwindBreakpoint } from '../hooks/useTailwindBreakpoint';

export const AuthPage = () => {
  const matchLogin = useMatch('/login');
  const { isMobile } = useTailwindBreakpoint();
  const isLogin = !!matchLogin;

  const imageSrc = isLogin ? '/images/login.png' : '/images/signup.png';

  return (
    <div>
      <div className="overflow-hidden h-screen flex flex-row justify-center align-items bg-[#fefbf7]">
        <div className="flex-1 h-screen flex items-center justify-center">
          {isLogin ? <Login /> : <Signup />}
        </div>

        {
          !isMobile ? 
          <div className="flex-1 h-screen flex items-center justify-center">
            <img
              src={imageSrc}
              alt={isLogin ? 'Login Illustration' : 'Signup Illustration'}
              className="w-full h-full"
              width={720}
              height={820}
            />
          </div> : null
        }
      </div>
    </div>
  );
};
