/*
 * @Author: nevin
 * @Date: 2022-01-20 09:20:31
 * @LastEditors: nevin
 * @LastEditTime: 2022-02-17 16:12:58
 * @Description: 邮件模块
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import mailConfig from 'config/mail.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mailConfig], // 加载配置
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('MAIL_CONFIG'),
    })
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule { }
