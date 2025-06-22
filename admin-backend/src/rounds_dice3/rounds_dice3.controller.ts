import { Controller, Get, Post, Body, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { Rounds_Dice3Service } from './rounds_dice3.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rounds')
export class Rounds_Dice3Controller {
  constructor(private readonly service: Rounds_Dice3Service) { }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const rounds = await this.service.findAll();
    res.setHeader('Content-Range', `rounds 0-${rounds.length - 1}/${rounds.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(rounds);
  }

  @Post('generate')
  async generate(@Body() body: any): Promise<void> {
    const { startTime, interval, count, memo } = body;
    await this.service.generateRounds(new Date(startTime), interval, count, memo);
  }

  @Get('current')
  async getCurrentRound(@Res() res: Response): Promise<void> {
    const round = await this.service.findCurrentRound();
    if (!round) {
      res.status(404).json({ message: '진행 중인 회차가 없습니다.' });
      return;
    }

    const timeLeft = this.getTimeLeft(round.endTime);

    res.json({
      roundid: round.id,
      round: round.round,
      startTime: round.startTime,
      endTime: round.endTime,
      timeLeft,
    });
  }

  private getTimeLeft(endTime: Date): string {
    const now = new Date(Date.now()); // UTC 기준
    const diff = Math.max(0, endTime.getTime() - now.getTime());
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  @Get('last')
  async getLastRound(@Res() res: Response): Promise<void> {
    const last = await this.service.findLastFinishedRound();
    if (!last) {
      res.status(404).json({ message: '마지막 회차 정보를 찾을 수 없습니다.' });
      return;
    }

    res.json({
      round: last.round,
      dice1: last.dice1,
      dice2: last.dice2,
      dice3: last.dice3,
      sum: last.sum,
    });
  }
}
