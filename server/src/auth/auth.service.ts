import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private returnUserData(userData: UserDocument) {
    // Don't return password
    const { password: _, ...result } = userData.toObject();
    return result;
  }
  async register(registerDto: RegisterDto) {
    const { username, password, instrument, isAdmin = false } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.usersService.create({
      username,
      password: hashedPassword,
      instrument,
      isAdmin,
    });

    return this.returnUserData(createdUser);
  }

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    const isPassMatch = user
      ? await bcrypt.compare(pass, user.password)
      : undefined;
    if (isPassMatch) {
      return this.returnUserData(user);
    } else {
      return null;
    }
  }

  // todo: fix type for this later
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      isAdmin: user.isAdmin,
    };
  }
}
