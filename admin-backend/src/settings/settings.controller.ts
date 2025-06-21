import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  // ✅ ReactAdmin의 useGetOne 대응
  @Get(':id')
  getSettings() {
    return this.service.findOne(); // id는 무시하고 싱글톤 반환
  }

  // ✅ useUpdate 대응
  @Put(':id')
  updateSettings(@Param('id') id: string, @Body() data: { bankName: string, accountNumber: string, accountHodler: string, inviteCode: string, signupBonus: number, allowSignup: boolean }) {
    return this.service.update(data);
  }
}
