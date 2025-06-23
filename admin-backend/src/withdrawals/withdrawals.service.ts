// withdrawals.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Withdrawal } from './withdrawal.entity';
import { User } from '../users/user.entity';

@Injectable()
export class WithdrawalsService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepository: Repository<Withdrawal>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<Withdrawal[]> {
    return this.withdrawalRepository.find({ relations: ['user'] });
  }

  async findAllByUser(userId: number) {
    return this.withdrawalRepository.find({ where: { userId } });
  }

  async findOne(id: number): Promise<Withdrawal | null> {
    return this.withdrawalRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
  async create(withdrawal: Withdrawal): Promise<void> {
    await this.withdrawalRepository.save(withdrawal);
  }

  async update(id: number, update: Partial<Withdrawal>): Promise<any> {
    const existing = await this.withdrawalRepository.findOne({ where: { id } });
    if (!existing) throw new Error('Withdrawal not found');

    const shouldDeduct = existing.status === 'pending' && update.status === 'approved';

    await this.withdrawalRepository.update(id, update);

    if (shouldDeduct) {
      // 포인트 차감
      await this.userRepository.decrement(
        { id: existing.userId },
        'point',
        existing.amount,
      );
    }

    return this.withdrawalRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async remove(id: number): Promise<void> {
    await this.withdrawalRepository.delete(id);
  }
}
