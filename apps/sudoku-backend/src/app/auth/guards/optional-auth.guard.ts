import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {

  constructor() {
    super();
  }

  handleRequest(err, user) {
    return user;
  }

}
