/*
 * @Author: nevin
 * @Date: 2022-01-19 16:13:27
 * @LastEditors: nevin
 * @LastEditTime: 2022-03-11 17:29:12
 * @Description: 主模块
 */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { ServerModule } from './server/server.module';
import * as Joi from '@hapi/joi';
import serverConfig from '../config/server.config';
import { SignMiddleware } from './middleware/sign.middleware';
import { LogMiddleware } from './middleware/log.middleware';
import { TokenMiddleware } from './middleware/token.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // 配置文件路径，也可以配置为数组如['/config/.env1','.env']。
      ignoreEnvFile: false, // 取消忽略配置文件，为true则仅读取操作系统环境变量，常用于生产环境
      isGlobal: true, // 作用于全局
      load: [serverConfig], // 加载自定义配置项
      // 配置文件.env校验
      validationSchema: Joi.object({
        PORT: Joi.string().default('7000'), // 端口
        ENV: Joi.string() // 环境
          .valid('development', 'production', 'test', 'provision')
          .default('development'),

        MONGO_URI: Joi.string().default(
          'mongodb://username:password@xxx.xx.xxx.xx:27017/dbname',
        ), // mongodb链接

        MAIL: Joi.string().default('xxxxxx@qq.com'), // 邮箱
        MAIL_AUTH_CODE: Joi.string().default('xxxxxx'), // 邮箱授权码
      }),
    }),
    DatabaseModule,
    MailModule,
    ServerModule,
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
      .forRoutes('*')

      .apply(LogMiddleware)
      // .forRoutes('users');
      .forRoutes('*');
  }
}
