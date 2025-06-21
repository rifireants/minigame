import { Module } from '@nestjs/common';
import { Rounds_Dice3Controller } from './rounds_dice3.controller';
import { Rounds_Dice3Service } from './rounds_dice3.service';

@Module({
  controllers: [Rounds_Dice3Controller],
  providers: [Rounds_Dice3Service]
})
export class RoundsDice3Module {}
