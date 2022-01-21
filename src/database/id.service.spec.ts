/*
 * @Author: nevin
 * @Date: 2022-01-20 13:37:39
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 15:01:18
 * @Description: 文件描述
 */
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { IdService } from './id.service';

describe('IdService', () => {
  let service: IdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[DatabaseModule],
      providers: [IdService],
    }).compile();

    service = module.get<IdService>(IdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
