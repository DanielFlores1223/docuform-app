import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { ApiResponse } from 'global-interfaces';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ResponseController } from 'src/common/interfaces';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: ResponseController<unknown>) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context)))
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext): HttpException {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseException = exception.getResponse() as { message: string | string[], error: string };

    const errorResponse: ApiResponse<unknown> = {
      status: false,
      path: request.url,
      statusCode: status,
      error: responseException.error,
      message: responseException.message,
    }

    return new HttpException(errorResponse, status);
  }

  responseHandler(res: ResponseController<unknown>, context: ExecutionContext): ApiResponse<unknown> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest(); 
    const statusCode = response.statusCode;

    if(!res.message)
      throw new InternalServerErrorException('the controller response must be a ResponseController<T>');

    return {
      status: true,
      path: request.url,
      statusCode,
      message: res.message,
      result: res.result,
    };
  }
}
