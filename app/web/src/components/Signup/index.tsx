import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useTailwindBreakpoint } from '../hooks/useTailwindBreakpoint';

const instruments = ['Guitar', 'Piano', 'Drums', 'Violin', 'Bass'];

export const Signup: React.FC = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [instrument, setInstrument] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isMobile } = useTailwindBreakpoint();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        username, password, instrument, isAdmin
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: isMobile ? '100%' : 450 }}>
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 rounded-lg space-y-5"
      >
        <div className="text-left">
          <h2 className="text-gray-600 text-lg">Welcome to JaMoveo</h2>
          <h1 className="text-3xl font-bold text-yellow-800">Register</h1>
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
          <label className="block text-sm font-medium mb-1">Your instrument*</label>
          <select
            className="w-full px-4 py-2 bg-[#f3eee4] rounded-md focus:outline-none"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            required
          >
            <option value="">Select your instrument</option>
            {instruments.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </select>
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
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} /> }
            </button>
          </div>
        </div>


        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="accent-yellow-600"
          />
          <label htmlFor="isAdmin" className="text-sm">
            Is user an admin?
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 transition-colors py-2 rounded-md font-semibold text-black"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-800 font-semibold">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};
