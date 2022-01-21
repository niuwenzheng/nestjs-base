/*
 * @Author: nevin
 * @Date: 2022-01-19 16:38:59
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 15:02:07
 * @Description: 数据库模块
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IdSchema, IdSchemaName } from './id.schema';
import { IdService } from './id.service';
import { UserSchema, UserSchemaName } from './schema/user.schema';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get('MONGO_CONFIG'),
        }),
        MongooseModule.forFeature([ // 挂载实体
            { name: IdSchemaName, schema: IdSchema },
            { name: UserSchemaName, schema: UserSchema }
        ]),
    ],
    providers: [IdService],
    exports: [IdService],
})
export class DatabaseModule { }
