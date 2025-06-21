import { Injectable } from '@nestjs/common';
import { Rounds_Dice3 } from './rounds_dice3.entity';

@Injectable()
export class Rounds_Dice3Service {
  private rounds: Rounds_Dice3[];

  findAll(): Rounds_Dice3[] {
    return this.rounds;
  }

  generateRounds(startTime: Date, interval: number, count: number, memo: string) {
    const base = new Date(startTime);
    base.setHours(0, 0, 0, 0);
    const diffMs = startTime.getTime() - base.getTime();
    const passedIntervals = Math.ceil(diffMs / (interval * 60 * 1000));

    const nextTime = new Date(base.getTime() + passedIntervals * interval * 60 * 1000);
    const roundNumber = Math.floor(diffMs / (interval * 60 * 1000)) + 1;
    
    this.rounds = [];
    for (let i = 0; i < count; i++) {
      const roundTime = new Date(nextTime.getTime() + i * interval * 60 * 1000);

      const dice1 = Math.ceil(Math.random() * 6);
      const dice2 = Math.ceil(Math.random() * 6);
      const dice3 = Math.ceil(Math.random() * 6);
      const sum = dice1 + dice2 + dice3;
      const round: Rounds_Dice3 = {
        id: i,
        round: roundNumber + i,
        startTime: roundTime,
        dice1: dice1,
        dice2: dice2,
        dice3: dice3,
        sum: sum,
        memo: memo,
        participants: 0,
        totalBet: 0,
        status: 'created',
        createdAt: new Date()
      };
      this.rounds.push(round);
    }
    return this.rounds.length;
  }
}
