import React from 'react';
import { BoxWrapper } from '../BoxWrapper';
import { useLocation } from 'react-router-dom';
import type { Song } from '../../api/songApi';

export const Live: React.FC = () => {
    const location = useLocation();
    const song: Song = location.state?.song;
    const getLyricsAndChords = (): React.ReactNode => {
    return song.lyricsWithChords.map((lyricsWithChords, index) => (
        <div key={index}>
        {lyricsWithChords.map((item, i) => (
            <span key={i} style={{ marginInline: 4 }}>
            {item.chords && <strong>{item.chords}</strong>} {item.lyrics}
            </span>
        ))}
        </div>
    ));
    };


  return (
    <BoxWrapper isDashed={true}>
        <h1>opening</h1>
        {getLyricsAndChords()}
    </BoxWrapper>
  );
};
