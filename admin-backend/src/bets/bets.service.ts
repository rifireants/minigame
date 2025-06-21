import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
  ) { }

  async findAll(): Promise<Bet[]> {
    return this.betRepository.find({
      relations: ['user', 'round'],
      order: { createdAt: 'DESC' }
    });
  }
  
  async findOne(id: number): Promise<Bet | null> {
    return this.betRepository.findOne({ where: { id } });
  }

  async create(bet: Bet): Promise<void> {
    await this.betRepository.save(bet);
  }

  async update(id: number, update: Partial<Bet>): Promise<void> {
    await this.betRepository.update(id, update);
  }

  async remove(id: number): Promise<void> {
    await this.betRepository.delete(id);
  }
}
