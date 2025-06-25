import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PointsService } from './points.service';

@UseGuards(JwtAuthGuard)
@Controller('points')
export class PointsController {
  constructor(private readonly pointLogsService: PointsService) {}

  @Get()
  async getUserLogs(@Req() req: any) {
    const userId = req.user?.userid;
    if (!userId) throw new UnauthorizedException();
    return this.pointLogsService.findByUser(userId);
  }
}

