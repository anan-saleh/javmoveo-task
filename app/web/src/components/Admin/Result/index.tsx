import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSongs } from '../../hooks/useSongs';
import type { Song } from '../../../api/songApi';

export const Result: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { songs } = useSongs(query);
  const navigate = useNavigate();

  const filtered = songs.filter((song) =>
    song.name.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (song: Song) => {
    navigate(`/live?song=${encodeURIComponent(song.name)}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Results for "{query}"</h2>
      {filtered.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((song) => (
            <li
              key={song._id}
              className="flex items-center p-3 bg-white rounded shadow hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(song)}
            >
              <img src={song.image} alt={song.name} className="w-12 h-12 mr-4 rounded" />
              <div>
                <p className="font-semibold">{song.name}</p>
                <p className="text-sm text-gray-600">{song.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
