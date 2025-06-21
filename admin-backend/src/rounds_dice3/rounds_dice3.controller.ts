import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { Rounds_Dice3Service } from './rounds_dice3.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rounds')
export class Rounds_Dice3Controller {
  constructor(private readonly service: Rounds_Dice3Service) { }

  // @Get()
  // findAll(): User[] {
  //   return this.usersService.findAll();
  // }
  @Get()
  findAll(@Res() res: Response): void {
    const rounds = this.service.findAll() || [];
    res.setHeader('Content-Range', `rounds 0-${rounds.length - 1}/${rounds.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(rounds);
  }

  @Post('generate')
  async generate(@Body() body: any) {
    const { startTime, interval, count, memo } = body;
    this.service.generateRounds(new Date(startTime), interval, count, memo);
  }
}
