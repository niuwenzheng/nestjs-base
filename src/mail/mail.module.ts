/*
 * @Author: nevin
 * @Date: 2022-01-20 09:20:31
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 15:19:46
 * @Description: 邮件模块
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Global()
@Module({
  imports: [
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
