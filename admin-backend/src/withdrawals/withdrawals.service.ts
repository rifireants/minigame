import { Injectable } from '@nestjs/common';
import { Withdrawal } from './withdrawal.entity';

@Injectable()
export class WithdrawalsService {
  private withdrawals: Withdrawal[] = [
    {
      id: 1,
      userId: 1,
      amount: 50000,
      bankName: 'KB국민',
      accountNumber: '0123456789',
      accountHolder: '예금주',
      status: 'pending',
      createdAt: new Date(),
    },
  ];

  findAll(): Withdrawal[] {
    return this.withdrawals;
  }

  findOne(id: number): Withdrawal | undefined {
    return this.withdrawals.find(w => w.id === id);
  }

  create(withdrawal: Withdrawal) {
    this.withdrawals.push(withdrawal);
  }

  update(id: number, update: Partial<Withdrawal>) {
    const index = this.withdrawals.findIndex(w => w.id === id);
    this.withdrawals[index] = { ...this.withdrawals[index], ...update };
  }

  remove(id: number) {
    this.withdrawals = this.withdrawals.filter(w => w.id !== id);
  }
}
