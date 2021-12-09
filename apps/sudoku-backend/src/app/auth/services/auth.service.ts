import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserData } from '../models/user.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const argon2 = require('argon2');

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {
  }

  async login(user: UserData) {
    const payload = { username: user.username, sub: user.id };
    return {
      id: user.id,
      username: user.username,
      access_token: this.jwtService.sign(payload)
    }
  }

  async signup(username: string, password: string) {
    const passwordHash = await argon2.hash(password);
    const newUser = await this.userService.createUser(username, passwordHash);
    return this.login(newUser);
  }

  async validateUser(username: string, password: string): Promise<UserData | null> {
    try {
      const user = await this.userService.findUserByName(username);
      if(!user) {
        return null;
      }
      if (username !== user.username) {
        return null;
      }

      const passwordValid = await argon2.verify(user.passwordHash, password);
      if(passwordValid) {
        const {passwordHash, ...userData} = user;
        return userData;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
    return null;
  }
}
