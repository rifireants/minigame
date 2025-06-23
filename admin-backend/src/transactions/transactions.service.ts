import { Injectable } from '@nestjs/common';
import { DepositsService } from '../deposits/deposits.service';
import { WithdrawalsService } from '../withdrawals/withdrawals.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly depositsService: DepositsService,
    private readonly withdrawalsService: WithdrawalsService,
  ) { }

  async getStats() {
    const deposits = await this.depositsService.findAll();
    const withdrawals = await this.withdrawalsService.findAll();

    const pendingDeposits = deposits.filter(d => d.status === 'pending').length;
    const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending').length;

    return {
      totalCount: deposits.length + withdrawals.length,
      pendingCount: pendingDeposits + pendingWithdrawals,
      depositTotal: deposits.reduce((sum, d) => sum + (d.amount || 0), 0),
      withdrawalTotal: withdrawals.reduce((sum, w) => sum + (w.amount || 0), 0),
    };
  }

  async getStatsByUser(userId: number) {
    const deposits = await this.depositsService.findAllByUser(userId);
    const withdrawals = await this.withdrawalsService.findAllByUser(userId);

    const pendingDeposits = deposits.filter(d => d.status === 'pending').length;
    const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending').length;

    return {
      totalCount: deposits.length + withdrawals.length,
      pendingCount: pendingDeposits + pendingWithdrawals,
      depositTotal: deposits.reduce((sum, d) => sum + (d.amount || 0), 0),
      withdrawalTotal: withdrawals.reduce((sum, w) => sum + (w.amount || 0), 0),
    };
  }
}
