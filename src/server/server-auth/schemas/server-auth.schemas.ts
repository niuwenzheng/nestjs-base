/*
 * @Author: nevin
 * @Date: 2020-12-10 11:49:12
 * @LastEditors: nevin
 * @LastEditTime: 2021-05-26 18:13:03
 * @Description: 服务间认证库模型
 */
import * as mongoose from 'mongoose';
import { ServerStatus } from '../enum/server-auth.enum';

export const OtherServerSchemaName = 'OtherServer';
export const OtherServerSchema = new mongoose.Schema(
  {
    server_id: String,
    server_tag: String, // 标识
    server_name: String, // 名称
    public_key: String, // 公钥

    status: { type: Number, default: ServerStatus.NORMAL },

    create_time: { type: Number, default: 0 },
    update_time: { type: Number, default: 0 },
  },
  { collection: 't_other_server', versionKey: false },
);
