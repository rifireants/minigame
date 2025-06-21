import { Controller, Get, Post, Body, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { Rounds_Dice3Service } from './rounds_dice3.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rounds')
export class Rounds_Dice3Controller {
  constructor(private readonly service: Rounds_Dice3Service) {}

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
}
