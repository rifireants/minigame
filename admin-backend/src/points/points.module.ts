import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './point.entity';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [PointsService],
  controllers: [PointsController],
  exports: [PointsService], // 다른 모듈에서 사용 시
})
export class PointsModule {}