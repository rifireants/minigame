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
    await this.betsService.resolveBets(roundToEnd.id, roundToEnd.sum);

    console.log(`[Round ${roundToEnd.round}] 종료됨 → 정산 완료`);
  }

  private roll(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  @Cron('50 9 * * *') // 매일 22시에 실행
  async processNextDayRounds() {
    console.log('[🛠] 다음날 회차 생성 시작');

    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // 다음날 0시

    const lastRound = await this.roundRepo.findOne({
      where: {},
      order: { endTime: 'DESC' },
    });

    // 오늘 자정까지 부족한 회차 생성
    if (!lastRound || new Date(lastRound.endTime).getTime() < today.getTime() + 24 * 60 * 60 * 1000) {
      const fillStartTime = lastRound ? new Date(lastRound.endTime) : new Date(today);
      const fillEndTime = new Date(today);
      fillEndTime.setDate(fillEndTime.getDate() + 1); // 오늘 자정까지

      console.log(`[🔧] 오늘 회차 보완 → ${fillStartTime.toISOString()}부터 ${fillEndTime.toISOString()}`);
      await this.generateRoundsForPeriod(fillStartTime, fillEndTime);
    }

    // 다음날 자정부터 다음날 자정까지 생성
    const nextDayStart = new Date(tomorrow);
    const nextDayEnd = new Date(tomorrow);
    nextDayEnd.setDate(nextDayEnd.getDate() + 1); // 다다음날 0시

    console.log(`[🚀] 다음날 회차 생성 → ${nextDayStart.toISOString()}부터 ${nextDayEnd.toISOString()}`);
    await this.generateRoundsForPeriod(nextDayStart, nextDayEnd);

    console.log('[✅] 다음날 회차 생성 완료');
  }
  private async generateRoundsForPeriod(start: Date, end: Date) {
    const intervalMinutes = 3;
    const rounds: Rounds_Dice3[] = [];

    let current = new Date(start);

    const baseDate = new Date(start);
    baseDate.setHours(0, 0, 0, 0); // 자정 기준

    while (current < end) {
      const roundStart = new Date(current);
      const roundEnd = new Date(current);
      roundEnd.setMinutes(roundEnd.getMinutes() + intervalMinutes);

      const diffMinutes = Math.floor((roundStart.getTime() - baseDate.getTime()) / 1000 / 60);
      const roundNumber = Math.floor(diffMinutes / intervalMinutes) + 1;

      const round = new Rounds_Dice3();
      round.round = roundNumber;
      round.startTime = roundStart;
      round.endTime = roundEnd;
      round.status = 'created';
      const dice1 = this.roll();
      const dice2 = this.roll();
      const dice3 = this.roll();
      const sum = dice1 + dice2 + dice3;

      round.dice1 = dice1;
      round.dice2 = dice2;
      round.dice3 = dice3;
      round.sum = sum;
      round.participants = 0;
      round.totalBet = 0;

      rounds.push(round);
      current = roundEnd;
    }

    await this.roundRepo.save(rounds);
  }
}
