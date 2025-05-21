import { BoxWrapper } from '@/components/BoxWrapper';
import { Waiting } from '@/components/player/Waiting';

export default function waiting() {
  return (
    <BoxWrapper isDashed>
      <Waiting />
    </BoxWrapper>
  );
}
