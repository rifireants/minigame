import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Rounds_Dice3 } from './rounds_dice3.entity';

@Injectable()
export class Rounds_Dice3Service {
  constructor(
    @InjectRepository(Rounds_Dice3)
    private readonly repo: Repository<Rounds_Dice3>,
  ) { }

  async findAll(): Promise<Rounds_Dice3[]> {
    return this.repo.find(
      {
        where: {
          status: Not('ended'),
        },
        order: {
          startTime: 'ASC',
        }
      }
    );
  }

  async generateRounds(startTime: Date, interval: number, count: number, memo: string): Promise<void> {
    const base = new Date(startTime);
    base.setHours(0, 0, 0, 0);
    const diffMs = startTime.getTime() - base.getTime();
    const passedIntervals = Math.ceil(diffMs / (interval * 60 * 1000));
    const nextTime = new Date(base.getTime() + passedIntervals * interval * 60 * 1000);
    const roundNumber = Math.floor(diffMs / (interval * 60 * 1000)) + 1;

    for (let i = 0; i < count; i++) {
      const roundTimeS = new Date(new Date(nextTime.getTime() + i * interval * 60 * 1000).toISOString());
      const roundTimeE = new Date(new Date(nextTime.getTime() + (i + 1) * interval * 60 * 1000).toISOString());
      const dice1 = Math.ceil(Math.random() * 6);
      const dice2 = Math.ceil(Math.random() * 6);
      const dice3 = Math.ceil(Math.random() * 6);
      const sum = dice1 + dice2 + dice3;

      const round = this.repo.create({
        round: roundNumber + i,
        startTime: roundTimeS,
        endTime: roundTimeE,
        dice1,
        dice2,
        dice3,
        sum,
        memo,
        participants: 0,
        totalBet: 0,
        status: 'created',
        createdAt: new Date(new Date().toISOString()),
      });

      await this.repo.save(round);
    }
  }

  async findCurrentRound(): Promise<Rounds_Dice3 | null> {
    const now = new Date(Date.now()); // UTC 기준
    const utcNow = new Date(now.toISOString()); // UTC 기준 Date 객체
    const query = this.repo
      .createQueryBuilder('round')
      .where('round.status = :status', { status: 'started' })
      .andWhere('round.startTime <= :now', { now: utcNow })
      .andWhere('round.endTime > :now', { now: utcNow })
      .orderBy('round.round', 'ASC');
    return await query.getOne();
  }

  async findLastFinishedRound(): Promise<any> {
    return this.repo.findOne({
      where: { status: 'ended' },
      order: { round: 'DESC' },
    });
  }
}
