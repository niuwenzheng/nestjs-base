import { Test, TestingModule } from '@nestjs/testing';
import { ServerAuthController } from './server-auth.controller';

describe('ServerAuthController', () => {
  let controller: ServerAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerAuthController],
    }).compile();

    controller = module.get<ServerAuthController>(ServerAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
