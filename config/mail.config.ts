/*
 * @Author: nevin
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 15:38:37
 * @Description: 邮件服务配置文件
 */
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export default () => ({
    MAIL_CONFIG: {
        transport: `smtps://${process.env.MAIL}:${process.env.MAIL_AUTH_CODE}@smtp.qq.com`,
        defaults: {
            from: `"Nevin" <${process.env.MAIL}>`
        },
        template: {
            dir: process.cwd() + '/template',
            // dir: path.join(__dirname, './template'),
            adapter: new PugAdapter(),
            options: {
                strict: true
            }
        }
    }
})