import { Injectable } from '@nestjs/common';
import { DemoInterface } from '../../../../../libs/interfaces/demo-interface';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to service-backend!' };
  }

  getOtherData(): DemoInterface {
    return {
      foo: 'bar',
      bar: 'foo'
    };
  }
}
