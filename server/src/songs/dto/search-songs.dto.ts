import { IsOptional, IsString } from 'class-validator';

export class SearchSongsDto {
  @IsOptional()
  @IsString()
  query?: string;
}
