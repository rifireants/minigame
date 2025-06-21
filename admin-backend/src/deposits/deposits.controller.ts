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
  findAll(@Res() res: Response): void {
    const data = this.depositsService.findAll();
    res.setHeader('Content-Range', `deposits 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Deposit {
    const deposit = this.depositsService.findOne(+id);
    if (!deposit) {
      throw new NotFoundException(`Deposit with id ${id} not found`);
    }
    return deposit;
  }

  @Post()
  create(@Body() deposit: Deposit) {
    this.depositsService.create(deposit);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: Partial<Deposit>) {
    this.depositsService.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.depositsService.remove(+id);
  }
}
