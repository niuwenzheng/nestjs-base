import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) {}

    sendEmail () {
        this.mailerService.sendMail({
            to: '18713351330@163.com', // 接收信息的邮箱
            from: '861796052@qq.com', // 要发送邮件的邮箱
            subject: 'Love You √',
            // html: '<b>welcome !</b>', // 和template不共存
            template: 'email',
        })
    }
}