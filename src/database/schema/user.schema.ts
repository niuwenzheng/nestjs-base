/*
 * @Author: nevin
 * @Date: 2021-12-24 14:32:46
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 11:36:29
 * @Description: 用户
 */
import * as mongoose from 'mongoose';

export const UserSchemaName = 'User';
export const UserSchema = new mongoose.Schema(
    {
        user_id: Number,
        user_name: String,
        
        mail: String,
        password: String,
        salt: String, // 密码盐

        status: Number,

        create_time: Number,
        update_time: Number
    },
    { collection: 't_user', versionKey: false }
);