import { Controller, Post, UseGuards, Request, Body, HttpException } from '@nestjs/common';
import { PasswordAuthGuard } from '../guards/password-auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest, UserDto } from '../models/user.dto';
import { Public } from '../public.decorator';
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
    const userAlreadyExists = await this.authService.userExists(body.username);
    if(userAlreadyExists) {
      throw new HttpException('Username is already taken', 401);
    }
    return this.authService.signup(body.username, body.password)
  }
}
