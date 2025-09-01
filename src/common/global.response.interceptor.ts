import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    // code that run on top of this will get execution first
    // after call pipe next.handle().pipe() will code will execute after controller
    // get data from controller
    // map convert data
    return next.handle().pipe(
      map((data) => ({
        status: 'Success',
        data: data,
      })),
    );
  }
}
