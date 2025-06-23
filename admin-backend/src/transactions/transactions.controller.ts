import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Get('all')
  async getStats() {
    return this.transactionsService.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getStatsByUser(@Req() req: any) {
    const userId = req.user?.userid;  // JWT 토큰 또는 세션에서 userId 추출
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.transactionsService.getStatsByUser(userId);
  }
}