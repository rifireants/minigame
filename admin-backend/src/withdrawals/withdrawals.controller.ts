// withdrawals.controller.ts
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
  Query,
} from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { Withdrawal } from './withdrawal.entity';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('withdrawals')
export class WithdrawalsController {
  constructor(
    private readonly withdrawalsService: WithdrawalsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response, @Query('sort') sort?: string): Promise<void> {
    let sortField = 'id';
    let sortOrder: 'ASC' | 'DESC' = 'ASC';

    if (sort) {
      const [field, order] = JSON.parse(sort); // React-Admin은 sort=["name","DESC"] 형식으로 보냄
      sortField = field;
      sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }

    const data = await this.withdrawalsService.findAll(sortField, sortOrder);
    res.setHeader('Content-Range', `withdrawals 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findAllByUser(@Req() req, @Res() res: Response): Promise<void> {
    const userId = req.user.userid;
    console.log('-------', userId);
    const data = await this.withdrawalsService.findAllByUser(userId);
    res.setHeader('Content-Range', `deposits 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const data = await this.withdrawalsService.findOne(+id);
    if (!data) {
      throw new NotFoundException(`Withdrawal with id ${id} not found`);
    }
    res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: Partial<Withdrawal>,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    const user = req.user as any;
    console.log("--------", user);
    const withdrawal = new Withdrawal();
    withdrawal.userId = user.userid;
    withdrawal.amount = body.amount || 0;
    withdrawal.bankName = body.bankName || "";
    withdrawal.accountNumber = body.accountNumber || "";
    withdrawal.accountHolder = body.accountHolder || user.username;
    withdrawal.status = 'pending'; // 기본 상태

    await this.withdrawalsService.create(withdrawal);
    res.status(201).json({ success: true, message: '출금 신청 완료' });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.withdrawalsService.remove(+id);
  }
}
