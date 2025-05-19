import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  instrument?: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
