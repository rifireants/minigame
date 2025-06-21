import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>,
  ) {}

  async findOne(): Promise<Setting | null> {
    return this.settingRepo.findOne({ where: { id: 'singleton' } });
  }

  async update(data: Partial<Setting>): Promise<Setting> {
    const existing = await this.findOne();
    const merged = this.settingRepo.merge(existing || { id: 'singleton' } as Setting, data);
    return this.settingRepo.save(merged);
  }
}
