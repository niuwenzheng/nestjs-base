/*
 * @Author: nevin
 * @Date: 2022-01-20 13:37:39
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 15:18:46
 * @Description: 文件描述
 */
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailModule } from './mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailerModule.forRootAsync({
          imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
          inject: [ConfigService],
          useFactory: () => ({
            transport: 'smtps://861796052@qq.com:etqxqwkapbxkbaje@smtp.qq.com',
            defaults: {
              from: '"Nevin" <861796052@qq.com>'
            },
            template: {
              dir: process.cwd() + '/template',
              // dir: path.join(__dirname, './template'),
              adapter: new PugAdapter(),
              options: {
                strict: true
              }
            }
          }),
        })
      ],
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
