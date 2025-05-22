import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song, SongSchema } from './scehmas/song.schema';
import { AuthModule } from 'src/auth/auth.module';

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
  imports: [mongooseModuleForFeature, AuthModule],
  controllers: [SongsController],
  providers: [SongsService]
})
export class SongsModule {}
