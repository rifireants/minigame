import { Test, TestingModule } from '@nestjs/testing';
import { RoundsDice3Controller } from './rounds_dice3.controller';

describe('RoundsDice3Controller', () => {
  let controller: RoundsDice3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundsDice3Controller],
    }).compile();

    controller = module.get<RoundsDice3Controller>(RoundsDice3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
