/*
 * @Author: nevin
 * @Date: 2022-01-20 15:56:08
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 16:53:27
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

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map(data => {

                const res: NormalResponse = {
                    data,
                    code: 0,
                    message: '请求成功',
                    url: ''
                }
                return res
            }),
        );
    }
}