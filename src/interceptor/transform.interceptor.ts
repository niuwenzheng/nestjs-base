/*
 * @Author: nevin
 * @Date: 2022-01-20 15:56:08
 * @LastEditors: nevin
 * @LastEditTime: 2023-07-25 09:45:55
 * @Description: 全局拦截器 慢日志打印
 */
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/global/interface/response.interface';

interface Response<T> {
  result: T;
}

/**
 * 不封装返回装饰器
 * @returns
 */
export function ResOrgData() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value; // 被装饰的函数
    descriptor.value = function (...args: any[]) {
      if (!!args[0]) args[0].is_org = true;
      return method(...args);
    };
  };
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const startTime = Date.parse(new Date().toString());

    const ctx = context.switchToHttp();
    // const response: Response<any> = ctx.getResponse();
    const request = ctx.getRequest();
    const reqUrl = request.originalUrl;

    return next.handle().pipe(
      map((data: T): HttpResult<T> | any => {
        // --------- 慢日志打印警告 STR ---------
        const ruqTime = Date.parse(new Date().toString()) - startTime;
        if (ruqTime >= 50) {
          Logger.verbose({
            level: 'verbose',
            message: `${reqUrl}::${ruqTime}ms`,
            mate: ruqTime,
          });
        }
        // --------- 慢日志打印警告 END ---------

        if (data !== 0 && !data) return data;

        // 不进行封装的返回
        if (request.is_org) return data as any;

        // 封装
        return {
          result: data,
          code: 0,
          message: '请求成功',
          url: reqUrl,
        };
      }),
    );
  }
}
