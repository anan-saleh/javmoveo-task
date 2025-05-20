import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Song extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  artist: string;

  @Prop()
  imageUrl: string;

  @Prop()
  lyricsWithChords: { lyrics: string; chords?: string }[][]
}

export const SongSchema = SchemaFactory.createForClass(Song);
