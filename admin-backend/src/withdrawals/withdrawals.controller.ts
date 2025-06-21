// withdrawals.controller.ts
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
  constructor(private readonly withdrawalsService: WithdrawalsService) { }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const data = await this.withdrawalsService.findAll();
    res.setHeader('Content-Range', `withdrawals 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const data = await this.withdrawalsService.findOne(+id);
    if (!data) {
      throw new NotFoundException(`Withdrawal with id ${id} not found`);
    }
    res.json(data);
  }

  @Post()
  async create(@Body() withdrawal: Withdrawal): Promise<void> {
    await this.withdrawalsService.create(withdrawal);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() update: Partial<Withdrawal>,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.withdrawalsService.update(+id, update);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.withdrawalsService.remove(+id);
  }
}
