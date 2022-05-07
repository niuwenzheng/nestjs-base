/*
 * @Author: nevin
 * @Date: 2021-12-25 14:16:53
 * @LastEditors: nevin
 * @LastEditTime: 2021-12-28 13:51:27
 * @Description: 文件描述
 */
import * as moment from 'moment';

export class TimeUtil {
  constructor();
  constructor(obj: any);
  constructor(obj?: any) {}

  static getNeedTime(timeNum: number): string;
  static getNeedTime(timeStr: string): number;
  static getNeedTime(theTime: number | string): string | number {
    if (typeof theTime === 'number')
      return moment(theTime).format('YYYY-MM-DD HH:mm:ss');
    return moment(theTime).valueOf();
  }
}
