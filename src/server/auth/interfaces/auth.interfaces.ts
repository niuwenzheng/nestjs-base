/*
 * @Author: nevin
 * @Date: 2022-01-21 14:28:19
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 15:16:35
 * @Description: 认证相关接口
 */

export interface Password {
  password: string, // 密码
  salt: string // 盐
}

export interface TokenInfo {
  readonly mail: string;
  readonly user_id: number;
  readonly user_name: string;
}