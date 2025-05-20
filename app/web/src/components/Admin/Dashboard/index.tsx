import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/admin/result?query=${encodeURIComponent(query.trim())}`);
    }
  };

  /** add a recommended song list */

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Search any song...</h1>
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter song or artist"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </form>
    </div>
  );
};
