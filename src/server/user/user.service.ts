/*
 * @Author: nevin
 * @Date: 2022-01-20 15:33:18
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 17:19:07
 * @Description: 用户服务
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdService } from 'src/database/id.service';
import { UserSchemaName } from 'src/database/schema/user.schema';
import { User } from './class/user.class';
import { UserModel } from './interfaces/user.interface';

@Injectable()
export class UserService {
    private idName = 'user';

    constructor(
        @InjectModel(UserSchemaName) private readonly userModel: Model<UserModel>,
        private readonly idService: IdService,
    ) { }

    /**
     * @description: 创建id
     * @return {string}
     */
    async createUserId(): Promise<number> {
        return await this.idService.createId(this.idName, 10000, 1);
    }

    /**
     * @description: 创建数据
     * @param {CreateUsersDto} createUsersInfo
     * @return:
     */
    async create(createUsersInfo: User): Promise<User> {
        const createdUser = new this.userModel(createUsersInfo);
        return await createdUser.save();
    }

    async getUserInfoByMail(mail: string): Promise<User> {
        const userInfo: User = await this.userModel
            .findOne({ mail })
            .exec();
        return userInfo;
    }

    async getUserInfoById(userId: number): Promise<User> {
        const userInfo: User = await this.userModel
            .findOne({ user_id: userId })
            .exec();
        return userInfo;
    }

    // 查询全部数据
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    /**
       * @description:
       * @param {*} user_id
       * @return {Promise<Users>}
       */
    async update(user_id: string, newData: any): Promise<any> {
        return await this.userModel.updateOne({ user_id }, newData).exec();
    }

    async delById(cardId: string, userId: string): Promise<any> {
        return await this.userModel
            .remove({ card_id: cardId, user_id: userId })
            .exec();
    }
}
