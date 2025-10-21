import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url } = request;

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const responseTime = Date.now() - startTime;

          this.logger.log(
            `${method} ${url} - ${response.statusCode} - ${responseTime}ms`,
          );
        },
        error: (error: Record<string, any>) => {
          const responseTime = Date.now() - startTime;

          // in case of dto errors
          if (Array.isArray(error?.response?.message)) {
            error.message =
              error?.response?.message?.[0] ?? error?.response?.message;
          }

          this.logger.error(
            `${method} ${url} - ${response.statusCode} - ${responseTime}ms - message: ${error.message}`,
            error,
          );
        },
      }),
    );
  }
}
