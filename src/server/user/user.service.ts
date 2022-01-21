/*
 * @Author: nevin
 * @Date: 2022-01-20 15:33:18
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 13:27:31
 * @Description: 用户服务
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdService } from 'src/database/id.service';
import { UserSchemaName } from 'src/database/schema/user.schema';
import { User } from './class/user.class';
import { UserModule } from './user.module';

@Injectable()
export class UserService {
    private idName = 'user';

    constructor(
        @InjectModel(UserSchemaName) private readonly userModel: Model<UserModule>,
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
    async create(createUsersInfo) {
        const createdUser = new this.userModel(createUsersInfo);
        return await createdUser.save();
    }

    /**
     * 根据邮箱获取用户信息
     * @param uMail 
     * @returns 
     */
    async getUserInfoByMail(uMail: string): Promise<any> {
        console.log('==================== uMail', uMail);

        try {
            const userInfo: any = await this.userModel
                .findOne({ u_mail: uMail })
                .exec();
            return userInfo;
        } catch (error) {
            console.log('==================== error', error);
        }

    }

    async getUserInfoById(cardId: string): Promise<any> {
        const cardInfo: any = await this.userModel
            .findOne({ card_id: cardId })
            .exec();
        return cardInfo;
    }

    // 查询全部数据
    async findAll(): Promise<any[]> {
        return await this.userModel.find().exec();
    }

    // 根据用户名获取数据（JWT用测试）
    async findOne(userName: string): Promise<any> {
        return await this.userModel.findOne({ user_name: userName }).exec();
    }

    // 根据user_id查询
    async findByUserId(user_id: string): Promise<any> {
        return await this.userModel.findOne({ user_id }).exec();
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
