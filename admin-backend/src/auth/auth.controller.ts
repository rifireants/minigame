import { Controller, Post, Get, Req, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Setting } from 'src/settings/settings.entity';
import { PointsService } from 'src/points/points.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pointService: PointsService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>,
  ) { }

  @Post('login')
  login(@Body() body: { userid: string; password: string }) {
    return this.authService.login(body.userid, body.password);
  }

  @Post('register')
  async register(@Body() body: {
    userid: string;
    password: string;
    inviteCode: string;
  }) {
    const existing = await this.userRepo.findOne({ where: { userid: body.userid } });
    if (existing) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }

    const inviteCodeSetting = await this.settingRepo.findOne({ where: {} });

    if (!inviteCodeSetting || body.inviteCode !== inviteCodeSetting.inviteCode) {
      throw new BadRequestException('유효하지 않은 가입코드입니다');
    }

    const user = this.userRepo.create({
      ...body,
      point: inviteCodeSetting.inviteBonus,
      bankName: '',
      accountNumber: '',
      createdAt: new Date(),
    });

    await this.userRepo.save(user);
    await this.pointService.create(user.id, 'increase', inviteCodeSetting.inviteBonus, '가입 보너스');
    return { message: '회원가입 성공' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verify(@Req() req) {
    // 토큰이 유효하면 guard가 통과되므로 그냥 200 OK 반환
    return { success: true, user: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    const userId = req.user.userid; // JWT payload에 담긴 userId
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'userid', 'username', 'role', 'point'], // 필요한 필드만
    });

    return user;
  }
}
