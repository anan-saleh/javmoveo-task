import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song, SongSchema } from './scehmas/song.schema';

const mongooseModuleForFeatureProps = [
  {
    name: Song.name,
    schema: SongSchema,
  },
];
const mongooseModuleForFeature = MongooseModule.forFeature(
  mongooseModuleForFeatureProps,
);

@Module({
  imports: [mongooseModuleForFeature],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
