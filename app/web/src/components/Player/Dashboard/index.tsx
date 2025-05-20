import React from 'react';
import { BoxWrapper } from '../../BoxWrapper';
import { Waiting } from '../Waiting';

export const PlayerDashboard: React.FC = () => {
  const isWaiting = false;
  return (
    <BoxWrapper isDashed={isWaiting}>
      {
        isWaiting ? <Waiting /> : <div>show opening</div>
      }
    </BoxWrapper>
  );
};
