import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Rounds_Dice3 } from './rounds_dice3.entity';
import { BetsService } from '../bets/bets.service';

@Injectable()
export class RoundProcessorService {
  constructor(
    @InjectRepository(Rounds_Dice3)
    private readonly roundRepo: Repository<Rounds_Dice3>,
    private readonly betsService: BetsService
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async processEndedRounds() {
    const now = new Date();
    const round = await this.roundRepo.findOne({
      where: { endTime: LessThanOrEqual(now), status: 'started' },
    });

    if (!round) return;

    // 주사위 결과 생성
    const dice1 = this.roll();
    const dice2 = this.roll();
    const dice3 = this.roll();
    const sum = dice1 + dice2 + dice3;

    round.dice1 = dice1;
    round.dice2 = dice2;
    round.dice3 = dice3;
    round.sum = sum;
    round.status = 'ended';

    await this.roundRepo.save(round);

    await this.betsService.resolveBets(round.id, sum);

    console.log(`[Round ${round.round}] 결과 처리 완료`);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async processRounds() {
    const now = new Date();

    // ✅ 1. 시작 시점이 된 라운드 → 상태 'started'로 변경
    const createdRounds = await this.roundRepo.find({
      where: {
        startTime: LessThanOrEqual(now),
        status: 'created',
      },
    });

    for (const round of createdRounds) {
      round.status = 'started';
      await this.roundRepo.save(round);
      console.log(`[Round ${round.round}] 시작됨 → 상태: started`);
    }

    // ✅ 2. 종료 시점이 된 라운드 → 상태 'ended'로 변경 + 정산
    const roundToEnd = await this.roundRepo.findOne({
      where: {
        endTime: LessThanOrEqual(now),
        status: 'started',
      },
    });

    if (!roundToEnd) return;

    // const dice1 = this.roll();
    // const dice2 = this.roll();
    // const dice3 = this.roll();
    // const sum = dice1 + dice2 + dice3;

    // roundToEnd.dice1 = dice1;
    // roundToEnd.dice2 = dice2;
    // roundToEnd.dice3 = dice3;
    // roundToEnd.sum = sum;

    const { dice1, dice2, dice3, sum } = roundToEnd;
    roundToEnd.status = 'ended';

    await this.roundRepo.save(roundToEnd);
    await this.betsService.resolveBets(roundToEnd.id, sum);

    console.log(`[Round ${roundToEnd.round}] 종료됨 → 정산 완료`);
  }

  private roll(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
