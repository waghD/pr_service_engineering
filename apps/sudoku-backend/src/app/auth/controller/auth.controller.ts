import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { PasswordAuthGuard } from '../guards/password-auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest, UserDto } from '../models/user.dto';
import { Public } from '../public.decorator';
import { UserService } from '../services/user.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from '../models/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Public()
  @UseGuards(PasswordAuthGuard)
  @ApiBody({ type: UserDto })
  @ApiResponse({type: AuthResponseDto})
  @Post('login')
  async login(@Request() req: AuthenticatedRequest): Promise<AuthResponseDto> {
    return this.authService.login(req.user);
  }

  @Public()
  @ApiBody({ type: UserDto })
  @ApiResponse({type: AuthResponseDto})
  @Post('signup')
  async signup(@Body() body: UserDto): Promise<AuthResponseDto> {
    return this.authService.signup(body.username, body.password)
  }
}
