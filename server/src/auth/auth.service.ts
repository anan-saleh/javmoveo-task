import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const { username, password, instrument, isAdmin = false } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.usersService.create({
      username,
      password: hashedPassword,
      instrument,
      isAdmin,
    });

    // Don't return password
    const { password: _, ...result } = createdUser.toObject();
    return result;
  }

}
