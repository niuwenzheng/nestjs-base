/*
 * @Author: nevin
 * @Date: 2022-01-20 15:56:08
 * @LastEditors: nevin
 * @LastEditTime: 2022-09-15 18:29:41
 * @Description: 全局拦截器
 */
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NormalResponse } from 'src/global/interface/response.interface';

interface Response<T> {
  data: T;
}

/**
 * 获取原生返回值
 * @param {T} data
 * @returns { is_org: boolean; data: T }
 */
export function GetOrgResponse<T>(data: T): { is_org: boolean; data: T } {
  return {
    is_org: true,
    data,
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
    const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    const request = ctx.getRequest();
    const reqUrl = request.originalUrl;

    return next.handle().pipe(
      map((data) => {
        // 不进行封装的返回
        const newData: any = data;
        if (newData.constructor === Object && newData.is_org) {
          return newData.data;
        }

        const res: NormalResponse = {
          data,
          code: 0,
          message: '请求成功',
          url: reqUrl,
        };
        return res;
      }),
    );
  }
}
