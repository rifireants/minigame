import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { User } from 'src/users/user.entity';
import { Rounds_Dice3 } from 'src/rounds_dice3/rounds_dice3.entity';
import { Setting } from 'src/settings/settings.entity';
import { PointsService } from 'src/points/points.service';

@Injectable()
export class BetsService {
  constructor(
    private readonly pointsService: PointsService,
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Rounds_Dice3)
    private readonly roundRepository: Repository<Rounds_Dice3>,

    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) { }

  async findAll(): Promise<Bet[]> {
    return this.betRepository.find({
      relations: ['user', 'round'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Bet | null> {
    return this.betRepository.findOne({
      relations: ['user', 'round'],
      where: { id }
    });
  }

  async create(bet: Bet): Promise<void> {
    await this.betRepository.save(bet);
  }

  async update(id: number, update: Partial<Bet>): Promise<void> {
    const bet = await this.betRepository.findOne({
      relations: ['round'],
      where: { id }
    });
    if (!bet) throw new NotFoundException('Bet not found');

    const resultType = bet.round.sum <= 10 ? 'low' : 'high';
    const oddEven = bet.round.sum % 2 === 0 ? 'even' : 'odd';

    const betTypes = update.betType?.split(',') || [];
    const isWin = betTypes.includes(resultType) || betTypes.includes(oddEven);
    const isWinPerfect = betTypes.includes(resultType) && betTypes.includes(oddEven);
    let payout = 0;
    if (isWin) {
      if (betTypes.length == 1) {
        payout = bet.amount * 2;
      } else if (betTypes.length == 2) {
        if (isWinPerfect) {
          payout = bet.amount * 4;
        }
        // else
        //   user.point += bet.amount * 1.5;
      }
    }
    update.payout = payout;
    await this.betRepository.update(id, update);
  }

  async remove(id: number): Promise<void> {
    await this.betRepository.delete(id);
  }

  async placeBet(userId: number, bet: Bet): Promise<{ success: boolean, message: string }> {
    const round = await this.roundRepository.findOne({ where: { id: bet.roundId } });
    if (!round) {
      return {
        success: false, message: `회차 ID ${bet.roundId}가 존재하지 않습니다.`,
      };
    }

    const setting = await this.settingRepository.findOne({ where: {} });
    let minBet = 10000;
    let maxBet = 100000000;

    if (setting) {
      try {
        minBet = setting.bettingMin ?? minBet;
        maxBet = setting.bettingMax ?? maxBet;
      } catch (e) {
        console.warn('설정 파싱 오류:', e);
      }
    }

    if (bet.amount < minBet || bet.amount > maxBet) {
      return { success: false, message: `베팅한도는 10,000 ~ 100,000,000원입니다.` };
    }

    const now = new Date();
    const endTime = new Date(round.endTime);
    const remaining = endTime.getTime() - now.getTime();

    // ✅ 회차 마감 여부 확인
    if (remaining <= 0) {
      return { success: false, message: `회차 ${bet.roundId}는 이미 마감되었습니다.` };
    }

    // ✅ 마감 10초 전이면 베팅 차단
    if (remaining <= 10000) {
      return { success: false, message: '베팅 마감 10초 전에는 베팅할 수 없습니다.' };
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return { success: false, message: `유저 ID ${userId}가 존재하지 않습니다.` };
    }

    if (user.point < bet.amount) {
      return {
        success: false,
        message: `포인트 부족 (보유: ${user.point}, 요청: ${bet.amount})`,
      };
    }

    // ✅ 포인트 차감 (선 베팅 차감 방식)
    user.point -= bet.amount;
    await this.userRepository.save(user);
    await this.pointsService.create(userId, 'decrease', bet.amount, `베팅 (${bet.betType})`);

    const newBet = this.betRepository.create({
      ...bet,
      userId,
      result: 'pending',  // 기본 상태
      status: 'active',
      createdAt: new Date(),
    });

    await this.betRepository.save(newBet);

    await this.roundRepository
      .createQueryBuilder()
      .update()
      .set({
        participants: () =>
          `(SELECT COUNT(DISTINCT "userId") FROM bet WHERE "roundId" = ${newBet.roundId})`,
        totalBet: () =>
          `(SELECT COALESCE(SUM(amount), 0) FROM bet WHERE "roundId" = ${newBet.roundId})`,
      })
      .where('id = :roundId', { roundId: newBet.roundId })
      .execute();
    return { success: true, message: "베팅되었습니다!" };
  }

  async resolveBets(roundId: number, sum: number): Promise<void> {
    const bets = await this.betRepository.find({ where: { roundId, status: 'active' } });

    const resultType = sum <= 10 ? 'low' : 'high';
    const oddEven = sum % 2 === 0 ? 'even' : 'odd';

    for (const bet of bets) {
      const betTypes = bet.betType.split(',');
      const isWin = betTypes.includes(resultType) || betTypes.includes(oddEven);
      const isWinPerfect = betTypes.includes(resultType) && betTypes.includes(oddEven);

      bet.result = isWin ? 'win' : 'lose';
      bet.status = 'resolved';

      let payout = 0;

      if (isWin) {
        const user = await this.userRepository.findOneBy({ id: bet.userId });

        if (user) {
          if (betTypes.length == 1) {
            payout = bet.amount * 2;
          } else if (betTypes.length == 2) {
            if (isWinPerfect) {
              payout = bet.amount * 4;
            }
            // else
            //   user.point += bet.amount * 1.5;
          }

          user.point += payout;
          await this.userRepository.save(user);
          await this.pointsService.create(bet.userId, 'increase', payout, `베팅 당첨 (회차 ${bet.roundId})`);
        }
      }
      bet.payout = payout;
      await this.betRepository.save(bet);
    }
  }

  async findByUser(userId: number) {
    return this.betRepository.find({
      where: { userId },
      relations: ['round'],
      order: { createdAt: 'DESC' },
    });  // userId에 해당하는 베팅 내역 반환
  }

  async getStatsByUser(userId: number) {
    const bets = await this.findByUser(userId);
    const winningBets = bets.filter(bet => bet.result === 'win');

    return {
      totalCount: bets.length,
      winCount: winningBets.length,
      payouts: winningBets.reduce((sum, bet) => sum + (bet.payout || 0), 0)
    };
  }

  async findRecentByUser(userId: number, limit: number): Promise<Bet[]> {
    return this.betRepository.find({
      relations: ['round'],
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
