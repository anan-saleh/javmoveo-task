import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchSongsDto } from './dto/search-songs.dto';
import { Song } from './scehmas/song.schema';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async searchSongs(dto: SearchSongsDto): Promise<Song[]> {
    const filter = dto.query
      ? { name: { $regex: dto.query, $options: 'i' } }
      : {};
    return this.songModel.find(filter).exec();
  }

  async getAllSongs(): Promise<Song[]> {
    return this.songModel.find().exec();
  }
}
