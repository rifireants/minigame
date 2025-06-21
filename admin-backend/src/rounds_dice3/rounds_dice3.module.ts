import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rounds_Dice3Controller } from './rounds_dice3.controller';
import { Rounds_Dice3Service } from './rounds_dice3.service';
import { Rounds_Dice3 } from './rounds_dice3.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rounds_Dice3])],
  controllers: [Rounds_Dice3Controller],
  providers: [Rounds_Dice3Service],
})
export class RoundsDice3Module {}
