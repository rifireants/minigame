import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';
import { Bet } from './bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],
  controllers: [BetsController],
  providers: [BetsService],
})
export class BetsModule {}
