import { Injectable } from '@nestjs/common';
import { Deposit } from './deposit.entity';

@Injectable()
export class DepositsService {
  private deposits: Deposit[] = [
    {
      id: 1,
      userId: 1,
      amount: 100000,
      accountHolder: "예금주",
      status: 'pending',
      createdAt: new Date(),
    },
  ];

  findAll(): Deposit[] {
    return this.deposits;
  }

  findOne(id: number): Deposit | undefined {
    return this.deposits.find(d => d.id === id);
  }

  create(deposit: Deposit) {
    this.deposits.push(deposit);
  }

  update(id: number, update: Partial<Deposit>) {
    const index = this.deposits.findIndex(d => d.id === id);
    this.deposits[index] = { ...this.deposits[index], ...update };
  }

  remove(id: number) {
    this.deposits = this.deposits.filter(d => d.id !== id);
  }
}
