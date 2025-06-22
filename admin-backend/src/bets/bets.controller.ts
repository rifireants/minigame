import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
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
  constructor(private readonly betsService: BetsService) { }

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

  // @Post()
  // async create(@Body() bet: Bet): Promise<void> {
  //   await this.betsService.create(bet);
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() update: Partial<Bet>): Promise<void> {
  //   await this.betsService.update(+id, update);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   await this.betsService.remove(+id);
  // }

  @UseGuards(JwtAuthGuard)
  @Post()
  async place(@Req() req: any, @Body() bet: Bet): Promise<{ success: boolean }> {
    const user = req.user as any;  // req.user에 로그인된 유저 정보가 들어 있음
    const ret =  this.betsService.placeBet(user.userid, bet);
    return ret;
  }
}
