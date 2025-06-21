import { Injectable } from '@nestjs/common';
import { Setting } from './settings.entity';

@Injectable()
export class SettingsService {
  private setting: Setting = {
    id: 'singleton',
    allowTransaction: true,
    autoAmount: 100000,
    startTime: '09:00',
    endTime: '18:00',
    depositMin: 10000,
    depositMax: 1000000,
    depositFee: 0,
    withdrawMin: 10000,
    withdrawMax: 1000000,
    withdrawFee1: 0,
    withdrawFee2: 0,
    bettingTime: 160,
    resultTime: 10,
    disableTime: 10,
    bettingMin: 1000,
    bettingMax: 1000000,
    oddsBS: 2,
    oddsOE: 2,
    bankName: 'KB국민',
    accountNumber: '담당자에게 문의하세요.',
    accountHodler: '(주)벨루나',
    inviteCode: '7979',
    signupBonus: 0,
    allowSignup: false,
  };

  findOne(): Setting | undefined {
    return this.setting;
  }

  update(data: Partial<typeof this.setting>) {
    this.setting = { ...this.setting, ...data };
    return this.setting;
  }
}
