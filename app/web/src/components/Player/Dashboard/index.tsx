import React, { useEffect } from 'react';
import { BoxWrapper } from '../../BoxWrapper';
import { Waiting } from '../Waiting';
import { socket } from '../../../api/socket/socket';
import { useNavigate } from 'react-router-dom';

export const PlayerDashboard: React.FC = () => {
  const isWaiting = true;
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('song-selected', (data) => {
      console.log('Song selected by admin:', data);
      navigate(`/live`, { state: { song: data } });
    });

    return () => {
      socket.off('song-selected');
    };
  }, []);
  return (
    <BoxWrapper isDashed={isWaiting}>
      <Waiting />
    </BoxWrapper>
  );
};
