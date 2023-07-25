/*
 * @Author: nevin
 * @Date: 2022-09-23 14:03:39
 * @LastEditTime: 2023-07-25 10:01:50
 * @LastEditors: nevin
 * @Description: 项目全局模块
 */
import * as Joi from '@hapi/joi';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import serverConfig from 'config/server.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { DbMysqlModule } from './db-mysql/db-mysql.module';
import { DbMongoModule } from './db-mongo/db-mongo.module';
import { LogModule } from './log/log.module';
import { SignMiddleware } from './middleware/sign.middleware';
import { TokenMiddleware } from './middleware/token.middleware';
import { LogMiddleware } from './middleware/log.middleware';
import { MailModule } from './mail/mail.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // 配置文件路径
      // envFilePath: ['/config/.env1','.env'],

      ignoreEnvFile: false, // 取消忽略配置文件，为true则仅读取操作系统环境变量，常用于生产环境
      isGlobal: true, // 作用于全局
      load: [serverConfig], // 加载server.config自定义全局配置项
      validationSchema: Joi.object({
        // 配置文件.env校验
        PORT: Joi.string().default('7000'),
        ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
      }),
    }),
    ServerModule,
    DbMysqlModule,
    DbMongoModule,
    LogModule, // 全部业务模块
    MailModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SignMiddleware)
      .exclude(
        { path: 'api/upload-files', method: RequestMethod.POST },
        'api/test',
      ) // 多个过滤多个参数
      .forRoutes('*')

      .apply(TokenMiddleware)
      .exclude(
        // { path: 'api/upload-files', method: RequestMethod.POST },
        '/api/user/logout',
      ) // 多个过滤多个参数
      .forRoutes('*')

      .apply(LogMiddleware)
      // .forRoutes('users');
      .forRoutes('*');
  }
}
