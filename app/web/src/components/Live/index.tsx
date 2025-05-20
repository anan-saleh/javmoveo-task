import React, { useEffect } from 'react';
import { BoxWrapper } from '../BoxWrapper';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Song } from '../../api/songApi';
import { socket } from '../../api/socket/socket';

export const Live: React.FC = () => {
    const location = useLocation();
    const storedUser = localStorage.getItem('user');
    const currentUser = JSON.parse(storedUser);
    const navigate = useNavigate();
    const song: Song = location.state?.song;
    const getLyricsAndChords = (): React.ReactNode => {
    return song?.lyricsWithChords?.map((lyricsWithChords, index) => (
        <div key={index}>
        {lyricsWithChords.map((item, i) => (
            <span key={i} style={{ marginInline: 4 }}>
            {item.chords && <strong>{item.chords}</strong>} {item.lyrics}
            </span>
        ))}
        </div>
    ));
    };

  useEffect(() => {
    socket.on('song-removed', () => {
      navigate(currentUser.isAdmin ? '/admin/dashboard' : '/player/dashboard');
    })
    return () => {
      socket.off('song-removed');
    };
  }, []);

  const quitSong = () => {
    socket.emit('remove-song');
  }
  return (
    <BoxWrapper isDashed={true}>
        <h1>opening</h1>
        {getLyricsAndChords()}
        {
          currentUser.isAdmin ? <button onClick={() => quitSong()}>Quit</button> : null
        }
    </BoxWrapper>
  );
};
