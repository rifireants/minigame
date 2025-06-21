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
import { DepositsService } from './deposits.service';
import { Deposit } from './deposit.entity';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) { }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const data = await this.depositsService.findAll();
    res.setHeader('Content-Range', `deposits 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const deposit = await this.depositsService.findOne(+id);
    if (!deposit) {
      throw new NotFoundException(`Deposit with id ${id} not found`);
    }
    res.json(deposit);
  }

  @Post()
  async create(@Body() deposit: Deposit): Promise<void> {
    await this.depositsService.create(deposit);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() update: Partial<Deposit>, @Res() res: Response): Promise<void> {
    const result = await this.depositsService.update(+id, update);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.depositsService.remove(+id);
  }
}
