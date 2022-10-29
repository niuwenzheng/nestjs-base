/*
 * @Author: nevin
 * @Date: 2022-10-29 22:13:30
 * @LastEditTime: 2022-10-29 22:13:44
 * @LastEditors: nevin
 * @Description:
 */
import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';

describe('MailController', () => {
  let controller: MailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
    }).compile();

    controller = module.get<MailController>(MailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
