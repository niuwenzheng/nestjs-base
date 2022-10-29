/*
 * @Author: nevin
 * @Date: 2020-12-10 12:31:00
 * @LastEditors: nevin
 * @LastEditTime: 2021-06-25 16:50:11
 * @Description: file content
 */
import { Document } from 'mongoose';

export interface OtherServer {
  readonly server_id: string;
  readonly server_tag: string;
  readonly server_name: string;
  readonly public_key: string;

  readonly status?: number; // 有默认值
  readonly create_time?: number; // 有默认值
  readonly update_time?: number; // 有默认值
}
export interface OtherServerModel extends OtherServer, Document {}

export interface ServerAuthBack {
  backUserInfo: string; // 加密过的用户信息
  aesKey: string; // 解密用的key
}

