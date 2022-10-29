/*
 * @Author: nevin
 * @Date: 2022-09-23 17:31:33
 * @LastEditTime: 2022-10-26 09:07:49
 * @LastEditors: nevin
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfig from 'config/mysql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mysqlConfig], // 加载自定义配置项
      validationSchema: Joi.object({
        // 配置文件.env校验
        MYSQL_HOST: Joi.string().default('localhost'),
        port: Joi.number().default(3306),
        synchronize: Joi.boolean() // 是否反向同步
          .valid(true, false)
          .default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      /**
       * name属性:
       * 用于链接多个mysql的标识
       * 使用时,引入 TypeOrmModule.forFeature([OldArticle], 'xxxx')
       *  以及
       * @InjectRepository(OldUser, 'xxxx)
       * private readonly oldUserRepository: Repository<OldUser>,
       */
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mysqlConfig: {
          host: string;
          port: number;
          username: string;
          password: string;
          database: string;
          synchronize: boolean; // true 会反向同步表，如加入数据库中没有的新字段
          logging: boolean; // 生产模式关闭
        } = await configService.get('MYSQL_CONFIG');

        return {
          ...mysqlConfig,
          type: 'mysql',
          entities: [`${__dirname}/entities/*.entity{.ts,.js}`], // 扫描所有实体类
          // timezone: '+8:00', // 时区调整
        };
      },
    }),
  ],
})
export class DbMysqlModule {}
