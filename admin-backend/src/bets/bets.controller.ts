import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { Bet } from './bet.entity';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const data = await this.betsService.findAll();
    res.setHeader('Content-Range', `bets 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bet> {
    const bet = await this.betsService.findOne(+id);
    if (!bet) throw new NotFoundException(`Bet ${id} not found`);
    return bet;
  }

  @Post()
  async create(@Body() bet: Bet): Promise<void> {
    await this.betsService.create(bet);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() update: Partial<Bet>): Promise<void> {
    await this.betsService.update(+id, update);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.betsService.remove(+id);
  }
}
