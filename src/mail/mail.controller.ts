/*
 * @Author: nevin
 * @Date: 2022-01-20 15:09:16
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 22:13:48
 * @Description: 文件描述
 */
import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  sendEmail() {
    this.mailService.sendEmail();
    return 'ok';
  }

  @Get('test')
  testEmail() {
    return 'ok';
  }
}
