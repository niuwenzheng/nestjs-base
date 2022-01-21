/*
 * @Author: nevin
 * @Date: 2021-12-24 13:49:52
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 13:23:55
 * @Description: 自增ID
 */
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IdSchemaName } from './id.schema';


// export interface Users extends Document {
//   readonly user_id: string;
//   readonly user_name: string;
//   readonly age: number;
// }
interface Id extends Document {
    readonly id_value: number;
    readonly id_name: string;
}
interface CreateIDDto {
    readonly id_value: number;
    readonly id_name: string;
}
@Injectable()
export class IdService {
    constructor(
        @InjectModel(IdSchemaName) private readonly idModel: Model<Id>
    ) { }

    /**
     * @description: 创建id
     * @param {string} id_name id名称
     * @param {number} id_value id
     * @return: Promise<number>
     */
    public async createId<T extends string | number>(id_name: string, id_value: number, id_type: T): Promise<T> {
        const fadArgs = {
            query: {
                id_name,
            },
            update: {
                $inc: { id_value: 1 },
                $set: { update_time: new Date() },
            },
            options: { new: true },
        };
        let newId = await this.idModel.findOneAndUpdate(fadArgs.query, fadArgs.update, fadArgs.options).exec();
        if (newId) {
            return <T>newId.id_value;
        }
        const createdUser = new this.idModel({ id_name, id_value });
        newId = await createdUser.save();

        const id = typeof id_type === "string" ? (newId.id_value).toString() : newId.id_value;

        return <T>id
    }
}