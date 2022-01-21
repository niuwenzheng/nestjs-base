/*
 * @Author: nevin
 * @Date: 2021-12-24 13:46:31
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-19 16:52:01
 * @Description: 自增主键ID
 */
import * as mongoose from 'mongoose';
export const IdSchemaName = 'Id';
export const IdSchema = new mongoose.Schema(
    {
        id_value: Number,
        id_name: String,
        update_time: Date
    },
    { collection: 't_ids', versionKey: false }
);