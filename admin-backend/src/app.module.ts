import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DepositsModule } from './deposits/deposits.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { BetsModule } from './bets/bets.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { RoundsDice3Module } from './rounds_dice3/rounds_dice3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DepositsModule,
    WithdrawalsModule,
    BetsModule,
    AuthModule,
    SettingsModule,
    RoundsDice3Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
