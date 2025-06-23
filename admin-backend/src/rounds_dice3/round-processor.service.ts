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

  // 🔥 매일 밤 11시에 다음날 라운드 자동 생성
  @Cron('0 23 * * *')
  async processNextDayRounds() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    console.log('[🛠] 다음날 회차 생성 시작');
    await this.generateRoundsForDate(tomorrow);
    console.log('[✅] 다음날 회차 생성 완료');
  }

  // 🔥 회차 생성 로직
  private async generateRoundsForDate(baseDate: Date) {
    const roundsPerDay = 480; // 3분 간격 × 24시간
    const intervalMinutes = 3;

    for (let i = 0; i < roundsPerDay; i++) {
      const startTime = new Date(baseDate);
      startTime.setMinutes(i * intervalMinutes);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + intervalMinutes);

      const round = new Rounds_Dice3();
      round.round = i + 1; // ✅ 당일 기준 회차 번호 (1~480 고정)
      round.startTime = startTime;
      round.endTime = endTime;
      round.status = 'created';

      await this.roundRepo.save(round);
    }
  }

  // 🔥 회차 번호 자동 증가
  private async getNextRoundNumber(): Promise<number> {
    const last = await this.roundRepo.find({
      order: { round: 'DESC' },
      take: 1,
    });
    return last.length > 0 ? last[0].round + 1 : 1;
  }
}
