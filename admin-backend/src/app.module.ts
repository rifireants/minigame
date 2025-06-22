import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Deposit } from './deposits/deposit.entity';
import { DepositsModule } from './deposits/deposits.module';
import { Withdrawal } from './withdrawals/withdrawal.entity';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { Bet } from './bets/bet.entity';
import { BetsModule } from './bets/bets.module';
import { AuthModule } from './auth/auth.module';
import { Setting } from './settings/settings.entity';
import { SettingsModule } from './settings/settings.module';
import { Rounds_Dice3 } from './rounds_dice3/rounds_dice3.entity';
import { RoundsDice3Module } from './rounds_dice3/rounds_dice3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체에서 사용 가능
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || "5432"),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Deposit, Withdrawal, Bet, Rounds_Dice3, Setting],
        synchronize: true, // 개발 중엔 true (자동 테이블 생성)
        logging: true,
        logger: 'advanced-console',
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
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
