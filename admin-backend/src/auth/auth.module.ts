import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Setting } from 'src/settings/settings.entity';
import { PointsModule } from 'src/points/points.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Setting]),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    PointsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
