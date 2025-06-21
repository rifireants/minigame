import { Test, TestingModule } from '@nestjs/testing';
import { RoundsDice3Service } from './rounds_dice3.service';

describe('RoundsDice3Service', () => {
  let service: RoundsDice3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundsDice3Service],
    }).compile();

    service = module.get<RoundsDice3Service>(RoundsDice3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
