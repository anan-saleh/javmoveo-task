import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { ERROR_TYPE } from 'src/utils/utils';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const cookieHeader = client.handshake.headers.cookie;
    const token = cookieHeader
      ?.split('; ')
      .find((c) => c.startsWith('token='))
      ?.split('=')[1];

    if (!token) throw new UnauthorizedException(ERROR_TYPE.MISSING_TOKEN);

    try {
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException(ERROR_TYPE.INVALID_TOKEN);
    }
  }
}
