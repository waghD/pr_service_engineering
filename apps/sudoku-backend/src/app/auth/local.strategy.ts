import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserData } from './models/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserData> {
    const userExists = await this.authService.userExists(username);

    if(!userExists) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Username does not exist'
      });
    }

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 402,
        message: 'Wrong password'
      });
    }
    return user;
  }
}
