import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class SongGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('select-song')
  handleSongSelection(client: Socket, songData: any) {
    console.log('Admin selected song:', songData);
    this.server.emit('song-selected', songData);
  }

  @SubscribeMessage('remove-song')
  handleSongRemove() {
    console.log("Admin removed song");
    this.server.emit('song-removed');
  }
}
