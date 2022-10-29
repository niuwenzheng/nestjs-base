/*
 * @Author: nevin
 * @Date: 2021-12-25 14:16:53
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-26 23:37:43
 * @Description: 文件描述
 */
import * as moment from 'moment';

export class TimeUtil {
  static getNeedTime(timeNum: number): string;
  static getNeedTime(timeStr: string): number;
  static getNeedTime(theTime: number | string): string | number {
    if (typeof theTime === 'number')
      return moment(theTime).format('YYYY-MM-DD HH:mm:ss');
    return moment(theTime).valueOf();
  }

  static getNowTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  static getThanOneYear() {
    return moment().subtract(1, 'y').format('YYYY-MM-DD HH:mm:ss');
  }

  static getDayStartTime() {
    return moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
  }

  static getTimestamp(): number {
    return Number(moment().format('x'));
  }
}
