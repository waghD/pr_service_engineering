import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { PasswordAuthGuard } from '../guards/password-auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest, UserDto } from '../models/user.dto';
import { Public } from '../public.decorator';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService, private userService: UserService) {
  }

  @Public()
  @UseGuards(PasswordAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: UserDto) {
    return this.authService.signup(body.username, body.password)
  }
}
