import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/auth/guards/ws.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class SongGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('select-song')
  handleSongSelection(client: Socket, songData: any) {
    if (!client.data.user?.isAdmin) return;
    console.log('Admin selected song:', songData);
    this.server.emit('song-selected', songData);
  }

  @SubscribeMessage('remove-song')
  handleSongRemove() {
    console.log("Admin removed song");
    this.server.emit('song-removed');
  }
}
