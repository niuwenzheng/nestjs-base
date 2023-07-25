/*
 * @Author: nevin
 * @Date: 2023-07-25 09:33:37
 * @LastEditTime: 2023-07-25 10:05:26
 * @LastEditors: nevin
 * @Description:
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
