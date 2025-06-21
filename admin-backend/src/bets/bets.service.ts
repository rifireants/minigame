import { Injectable } from '@nestjs/common';
import { Bet } from './bet.entity';

@Injectable()
export class BetsService {
  private bets: Bet[] = [
    {
      id: 1,
      userId: 1,
      amount: 1000,
      payout: 2000,
      betType: 'odd',
      result: 'win',
      status: 'active',
      createdAt: new Date(),
    },
  ];

  findAll(): Bet[] {
    return this.bets;
  }

  findOne(id: number): Bet | undefined {
    return this.bets.find(b => b.id === id);
  }

  create(bet: Bet) {
    this.bets.push(bet);
  }

  update(id: number, update: Partial<Bet>) {
    const index = this.bets.findIndex(b => b.id === id);
    this.bets[index] = { ...this.bets[index], ...update };
  }

  remove(id: number) {
    this.bets = this.bets.filter(b => b.id !== id);
  }
}
