import { Injectable } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserData } from '../models/user.dto';

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

  async validateUser(username: string, password: string): Promise<UserData | null> {
    try {
      const user = await this.userService.findUserByName(username);
      if(!user) {
        return null;
      }
      if (username !== user.username) {
        return null;
      }
      const passwordValid = this.comparePasswordHashes(password, user.passwordHash);
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

  comparePasswordHashes(hash1: string, hash2: string): boolean {
    if(!hash1 || !hash2) {
      return false;
    }
    const hash1Buf = Buffer.from(hash1, 'utf8');
    const hash2Buf = Buffer.from(hash2, 'utf8');

    return timingSafeEqual(hash1Buf, hash2Buf);
  }
}
