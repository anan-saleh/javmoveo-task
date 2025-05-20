import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useTailwindBreakpoint } from '../hooks/useTailwindBreakpoint';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isMobile } = useTailwindBreakpoint();
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({
        username, password
      });
      if (user.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/player/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: isMobile ? '100%' : 450 }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-lg space-y-5"
      >
        <div className="text-left">
          <h2 className="text-gray-600 text-lg">Welcome to JaMoveo</h2>
          <h1 className="text-3xl font-bold text-yellow-800">Login</h1>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Username*</label>
          <input
            type="text"
            placeholder="Select your username"
            className="w-full px-4 py-2 bg-[#f3eee4] rounded-md focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Create password*</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Your Password"
              className="w-full px-4 py-2 bg-[#f3eee4] rounded-md pr-10 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 transition-colors py-2 rounded-md font-semibold text-black"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/register" className="text-yellow-800 font-semibold">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};
