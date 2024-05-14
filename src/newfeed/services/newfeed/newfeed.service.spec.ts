import { Test, TestingModule } from '@nestjs/testing';
import { NewfeedService } from './newfeed.service';

describe('NewfeedService', () => {
  let service: NewfeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewfeedService],
    }).compile();

    service = module.get<NewfeedService>(NewfeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
