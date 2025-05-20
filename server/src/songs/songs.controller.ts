// src/songs/songs.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SearchSongsDto } from './dto/search-songs.dto';
import { Song } from './scehmas/song.schema';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('getSongByName')
  async getSongs(@Query() query: SearchSongsDto): Promise<Song[]> {
    return this.songsService.searchSongs(query);
  }
}
