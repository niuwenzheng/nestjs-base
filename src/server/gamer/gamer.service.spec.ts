import { Test, TestingModule } from '@nestjs/testing';
import { GamerService } from './gamer.service';

describe('GamerService', () => {
  let service: GamerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamerService],
    }).compile();

    service = module.get<GamerService>(GamerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
