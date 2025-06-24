import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Setting } from './settings.entity';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSettings() {
    return await this.service.findOne(); // id는 무시하고 싱글톤 반환
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateSettings(@Param('id') id: string, @Body() data: Partial<Setting>) {
    return await this.service.update(data);
  }
}
