import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
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
      setMessage('Logged in successfully');
    } catch (error) {
      setMessage('Login failed');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
};
