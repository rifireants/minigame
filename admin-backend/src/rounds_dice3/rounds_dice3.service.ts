import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rounds_Dice3 } from './rounds_dice3.entity';

@Injectable()
export class Rounds_Dice3Service {
  constructor(
    @InjectRepository(Rounds_Dice3)
    private readonly repo: Repository<Rounds_Dice3>,
  ) {}

  async findAll(): Promise<Rounds_Dice3[]> {
    return this.repo.find();
  }

  async generateRounds(startTime: Date, interval: number, count: number, memo: string): Promise<void> {
    const base = new Date(startTime);
    base.setHours(0, 0, 0, 0);
    const diffMs = startTime.getTime() - base.getTime();
    const passedIntervals = Math.ceil(diffMs / (interval * 60 * 1000));
    const nextTime = new Date(base.getTime() + passedIntervals * interval * 60 * 1000);
    const roundNumber = Math.floor(diffMs / (interval * 60 * 1000)) + 1;

    for (let i = 0; i < count; i++) {
      const roundTime = new Date(nextTime.getTime() + i * interval * 60 * 1000);
      const dice1 = Math.ceil(Math.random() * 6);
      const dice2 = Math.ceil(Math.random() * 6);
      const dice3 = Math.ceil(Math.random() * 6);
      const sum = dice1 + dice2 + dice3;

      const round = this.repo.create({
        round: roundNumber + i,
        startTime: roundTime,
        dice1,
        dice2,
        dice3,
        sum,
        memo,
        participants: 0,
        totalBet: 0,
        status: 'created',
        createdAt: new Date(),
      });

      await this.repo.save(round);
    }
  }
}
