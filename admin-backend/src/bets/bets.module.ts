import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';
import { Bet } from './bet.entity';
import { User } from 'src/users/user.entity';
import { Rounds_Dice3 } from 'src/rounds_dice3/rounds_dice3.entity';
import { Setting } from 'src/settings/settings.entity';
import { PointsModule } from 'src/points/points.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet, User, Rounds_Dice3, Setting]),
    PointsModule
  ],
  controllers: [BetsController],
  providers: [BetsService],
  exports: [BetsService],
})
export class BetsModule {}
