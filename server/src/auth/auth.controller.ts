import { Response } from 'express';
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private isProd = process.env.NODE_ENV === 'prod'; // todo: make it globally avaliable

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // todo: fix type for this later
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const loggedInUser = await this.authService.login(req.user);
    res.cookie('token', loggedInUser.token, { // todo: fix duplication
      httpOnly: this.isProd ? false : true,
      sameSite: this.isProd ? 'none' : 'lax',
      secure: this.isProd,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      isAdmin: loggedInUser.isAdmin,
      username: loggedInUser.username,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', { // todo: fix duplication
      httpOnly: this.isProd ? false : true,
      sameSite: this.isProd ? 'none' : 'lax',
      secure: this.isProd,
    });
    return {
      message: 'Logged out',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  // todo: fix type for this later
  getProfile(@Req() req: any) {
    return req.user;
  }
}
