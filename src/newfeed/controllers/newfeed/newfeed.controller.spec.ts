import { Test, TestingModule } from '@nestjs/testing';
import { NewfeedController } from './newfeed.controller';

describe('NewfeedController', () => {
  let controller: NewfeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewfeedController],
    }).compile();

    controller = module.get<NewfeedController>(NewfeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
