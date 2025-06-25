import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private pointRepo: Repository<Point>,
  ) {}

  async create(userId: number, type: 'increase' | 'decrease', amount: number, reason?: string) {
    const log = this.pointRepo.create({ userId, type, amount, reason });
    return this.pointRepo.save(log);
  }

  async findByUser(userId: number): Promise<Point[]> {
    return this.pointRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 5,
    });
  }
}
