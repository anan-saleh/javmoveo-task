import { Controller, Get, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SearchSongsDto } from './dto/search-songs.dto';
import { Song } from './scehmas/song.schema';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  //todo: apply guarding to these endpoint for admin only
  @Get('getSongByName')
  async getSongs(@Query() query: SearchSongsDto): Promise<Song[]> {
    return this.songsService.searchSongs(query);
  }

  @Get('getAllSongs')
  async getAllSongs(): Promise<Song[]> {
    return this.songsService.getAllSongs();
  }
}
