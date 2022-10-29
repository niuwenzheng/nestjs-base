/*
 * @Author: nevin
 * @Date: 2021-12-25 14:16:53
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 23:13:02
 * @Description: 文件描述
 */
export class StrUtil {
  // constructor(parameters) {}
  /**
   * 获取认证码
   * @param num
   * @returns
   */
  static getAuthCode(num: number): string {
    const str = '23QWERTYUIOPASDFGHJKLZXCVBNM1456789zxcvbnmasdfghjklqwertyuiop';
    let res = '';
    for (let i = 0; i < num; i++) {
      res += str[Math.floor(Math.random() * str.length)];
    }
    return res;
  }
}
