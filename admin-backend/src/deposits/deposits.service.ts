import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deposit } from './deposit.entity';
import { User } from '../users/user.entity';
import { PointsService } from 'src/points/points.service';

@Injectable()
export class DepositsService {
  constructor(
    private readonly pointsService: PointsService,
    @InjectRepository(Deposit)
    private depositRepository: Repository<Deposit>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // async findAll(sortField = 'id', sortOrder: 'ASC' | 'DESC' = 'ASC'): Promise<Deposit[]> {
  //   return this.depositRepository.find({
  //     relations: ['user'],
  //     order: {
  //       [sortField]: sortOrder,
  //     },
  //   });
  // }

  async findAll(
    sortField = 'id',
    sortOrder: 'ASC' | 'DESC' = 'DESC'
  ): Promise<Deposit[]> {
    const qb = this.depositRepository
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
    return this.depositRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Deposit | null> {
    return this.depositRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(deposit: Deposit): Promise<void> {
    await this.depositRepository.save(deposit);
  }

  async update(id: number, update: Partial<Deposit>): Promise<any> {
    const existing = await this.depositRepository.findOne({ where: { id } });
    if (!existing) throw new Error('Deposit not found');

    // 상태가 pending이고, 변경하려는 값이 approved일 때
    const shouldReward = existing.status === 'pending' && update.status === 'approved';
    await this.depositRepository.update(id, update);

    if (shouldReward) {
      // 유저 포인트 적립
      await this.userRepository.increment({ id: existing.userId }, 'point', existing.amount);
      await this.pointsService.create(existing.userId, 'increase', existing.amount, '충전');
    }

    return this.depositRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async remove(id: number): Promise<void> {
    await this.depositRepository.delete(id);
  }
}
