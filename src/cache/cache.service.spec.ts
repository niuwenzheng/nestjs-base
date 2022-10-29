/*
 * @Author: nevin
 * @Date: 2022-02-18 09:19:15
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 22:55:46
 * @Description: 文件描述
 */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { RedisModule } from './redis/redis.module';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot([
          {
            name: 'test',
            host: '127.0.0.1',
            port: 6379,
            password: '',
            db: 1,
          },
        ]),
      ],

      providers: [CacheService],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();

    const xx = service.setKey('test', 'test_value', 100);
    console.log(xx);
  });
});
