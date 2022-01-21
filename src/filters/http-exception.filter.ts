/*
 * @Author: nevin
 * @Date: 2022-01-20 16:05:23
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 10:33:10
 * @Description: 文件描述
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorResponse } from 'src/global/interface/response.interface';

import { errHttpBackMap } from './http-exception.back-code';

errHttpBackMap.set('1', '请求失败');

// 临时解决不返回401 STR
@Catch(Error)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const errorResponse: ErrorResponse = {
      data: '',
      message: '',
      code: '', // 自定义code
      url: request.originalUrl, // 错误的url地址
    };

    if ((error.message = 'Unauthorized')) {
      response.status(HttpStatus.UNAUTHORIZED);
      response.header('Content-Type', 'application/json; charset=utf-8');
      response.send(errorResponse);
    }
  }
}
// 临时解决不返回401 END
export class AppHttpException extends HttpException {
  constructor(errCode: string) {
    super(errCode, HttpStatus.OK);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const errorResponse: ErrorResponse = {
      data: exception.getResponse(),
      message: '',
      code: '', // 自定义code
      url: request.originalUrl, // 错误的url地址
    };

    const errObj = exception.getResponse() as {
      message?: '';
      statusCode?: '';
      error?: '';
    };

    if (typeof errObj === 'object') {
      errorResponse.data = errObj;
      errorResponse.message = errObj.message || '服务器异常';
      errorResponse.code = errObj.error || '1';
    }

    if (typeof errObj === 'string') {
      const messageCode = errHttpBackMap.get(exception.message)
        ? exception.message
        : '1';

      errorResponse.data = '';
      errorResponse.message = errHttpBackMap.get(messageCode);
      errorResponse.code = messageCode;
    }

    Logger.log(
      '错误提示:',
      errorResponse.code + ':' + errorResponse.message,
    );

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
