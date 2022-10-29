/*
 * @Author: nevin
 * @Date: 2022-01-20 16:41:36
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-21 22:21:11
 * @Description: 请求返回接口
 */

export interface HttpResult<T> {
  result: T; // 数据
  message: string; // 信息
  code: 0 | string; // 自定义code
  url: string; // 错误的url地址
}
