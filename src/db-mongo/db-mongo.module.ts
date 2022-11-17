/*
 * @Author: nevin
 * @Date: 2022-09-23 18:00:51
 * @LastEditTime: 2022-11-17 21:49:09
 * @LastEditors: nevin
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from 'config/mongo.config';
import { Id, IdSchema } from './id.schema';
import { IdService } from './id.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfig], // 加载配置
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('MONGO_CONFIG'),
    }),
    MongooseModule.forFeature([
      // 挂载实体
      { name: Id.name, schema: IdSchema },
    ]),
  ],
  providers: [IdService],
  exports: [IdService],
})
export class DbMongoModule {}
