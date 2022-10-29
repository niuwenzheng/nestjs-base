/*
 * @Author: nevin
 * @Date: 2022-07-01 14:36:34
 * @LastEditTime: 2022-10-19 23:24:16
 * @LastEditors: nevin
 * @Description:
 */
import * as _ from 'lodash';
import moment from 'moment';
export class IdUtil {
  static generateId(idType: string) {
    let nowTime = Math.round(new Date().getTime() / 1000).toString();

    nowTime = idType + (Number(nowTime) + 2000000000);

    return nowTime;
  }

  static dateId(i?: number): string {
    if (i === undefined) i = _.random(0, 99999);
    if (i > 99999) return null;

    const bit = i.toString().length;
    const tempRandomNum = 10 ** bit + i;
    const tempRandomStr = tempRandomNum.toString().slice(1);
    const idStr = this.getNowTimeNumber() + tempRandomStr;

    return idStr;
  }

  static getNowTimeNumber(): string {
    return moment().format('YYYYMMDDHHmmss');
  }
}
