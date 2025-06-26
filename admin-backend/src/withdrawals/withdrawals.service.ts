// withdrawals.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Withdrawal } from './withdrawal.entity';
import { User } from '../users/user.entity';
import { PointsService } from 'src/points/points.service';

@Injectable()
export class WithdrawalsService {
  constructor(
    private readonly pointsService: PointsService,
    @InjectRepository(Withdrawal)
    private withdrawalRepository: Repository<Withdrawal>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(
    sortField = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Withdrawal[]> {
    const qb = this.withdrawalRepository
      .createQueryBuilder('deposit')
      .leftJoinAndSelect('deposit.user', 'user');

    // 정렬 필드 처리
    if (sortField === 'user.userid') {
      qb.orderBy('user.userid', sortOrder);
    } else {
      qb.orderBy(`deposit.${sortField}`, sortOrder);
    }

    return qb.getMany();
  }

  async findAllByUser(userId: number) {
    return this.withdrawalRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });
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
      await this.userRepository.decrement({ id: existing.userId }, 'point', existing.amount,);
      await this.pointsService.create(existing.userId, 'decrease', existing.amount, '출금');
    }

    return this.withdrawalRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async remove(id: number): Promise<void> {
    await this.withdrawalRepository.delete(id);
  }
}
