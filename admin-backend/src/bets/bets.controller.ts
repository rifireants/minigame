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
  findAll(@Res() res: Response): void {
    const data = this.betsService.findAll();
    res.setHeader('Content-Range', `bets 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Bet {
    const bet = this.betsService.findOne(+id);
    if (!bet) throw new NotFoundException(`Bet ${id} not found`);
    return bet;
  }

  @Post()
  create(@Body() bet: Bet) {
    this.betsService.create(bet);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: Partial<Bet>) {
    this.betsService.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.betsService.remove(+id);
  }
}
