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
import { WithdrawalsService } from './withdrawals.service';
import { Withdrawal } from './withdrawal.entity';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Get()
  findAll(@Res() res: Response): void {
    const data = this.withdrawalsService.findAll();
    res.setHeader('Content-Range', `withdrawals 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Withdrawal {
    const withdrawal = this.withdrawalsService.findOne(+id);
    if (!withdrawal) {
      throw new NotFoundException(`Withdrawal with id ${id} not found`);
    }
    return withdrawal;
  }

  @Post()
  create(@Body() withdrawal: Withdrawal) {
    this.withdrawalsService.create(withdrawal);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: Partial<Withdrawal>) {
    this.withdrawalsService.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.withdrawalsService.remove(+id);
  }
}
