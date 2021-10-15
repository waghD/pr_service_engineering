import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DemoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<string>): Observable<string> {
    console.log('backend DemoInterceptor context: ', context);
    return next.handle();
  }
}
