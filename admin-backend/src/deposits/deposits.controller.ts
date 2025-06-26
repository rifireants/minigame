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
import { DepositsService } from './deposits.service';
import { Deposit } from './deposit.entity';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('deposits')
export class DepositsController {
  constructor(
    private readonly depositsService: DepositsService,
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

    const data = await this.depositsService.findAll(sortField, sortOrder);
    res.setHeader('Content-Range', `deposits 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findAllByUser(@Req() req, @Res() res: Response): Promise<void> {
    const userId = req.user.userid;
    const data = await this.depositsService.findAllByUser(userId);
    res.setHeader('Content-Range', `deposits 0-${data.length - 1}/${data.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const deposit = await this.depositsService.findOne(+id);
    if (!deposit) {
      throw new NotFoundException(`Deposit with id ${id} not found`);
    }
    res.json(deposit);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: Partial<Deposit>,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    const user = req.user as any;
    const deposit = new Deposit();
    deposit.userId = user.userid;
    deposit.amount = body.amount || 0;
    deposit.accountHolder = body.accountHolder || user.username;
    deposit.status = 'pending'; // 기본 상태

    await this.depositsService.create(deposit);
    res.status(201).json({ success: true, message: '충전 신청 완료' });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() update: Partial<Deposit>, @Res() res: Response): Promise<void> {
    const result = await this.depositsService.update(+id, update);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.depositsService.remove(+id);
  }
}
