import React, { useState } from 'react';

export const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('account created successfully');
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
      {!isAdmin && (
        <div>
          <label>Instrument: </label>
          <input
            type="text"
            value={instrument}
            onChange={e => setInstrument(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={e => setIsAdmin(e.target.checked)}
          />{' '}
          Register as Admin
        </label>
      </div>
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
};
