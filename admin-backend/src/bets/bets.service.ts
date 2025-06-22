import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { User } from 'src/users/user.entity';
import { Rounds_Dice3 } from 'src/rounds_dice3/rounds_dice3.entity';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Rounds_Dice3)
    private readonly roundRepository: Repository<Rounds_Dice3>,
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

  async placeBet(userId: number, bet: Bet): Promise<{ success: boolean, message: string }> {
    const round = await this.roundRepository.findOne({ where: { id: bet.roundId } });
    if (!round) {
      return { success: false, message: `회차 ID ${bet.roundId}가 존재하지 않습니다.` };
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

    const newBet = this.betRepository.create({
      ...bet,
      userId,
      result: 'pending',  // 기본 상태
      status: 'active',
      createdAt: new Date(),
    });

    await this.betRepository.save(newBet);
    return { success: true, message: "베팅되었습니다!" };
  }

  async resolveBets(roundId: number, sum: number): Promise<void> {
    const bets = await this.betRepository.find({ where: { roundId, status: 'active' } });

    const resultType = sum <= 10 ? 'small' : 'big';
    const oddEven = sum % 2 === 0 ? 'even' : 'odd';

    for (const bet of bets) {
      const betTypes = bet.betType.split(',');
      const isWin = betTypes.includes(resultType) || betTypes.includes(oddEven);
      const isWinPerfect = betTypes.includes(resultType) && betTypes.includes(oddEven);

      bet.result = isWin ? 'win' : 'lose';
      bet.status = 'resolved';

      if (isWin) {
        const user = await this.userRepository.findOneBy({ id: bet.userId });

        if (user) {
          if (betTypes.length == 1) {
            user.point += bet.amount * 2;
          } else if (betTypes.length == 2) {
            if (isWinPerfect)
              user.point += bet.amount * 2.5;
            else
              user.point += bet.amount * 1.5;
          }

          await this.userRepository.save(user);
        }
      }
      await this.betRepository.save(bet);
    }
  }
}
