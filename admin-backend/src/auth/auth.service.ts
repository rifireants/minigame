import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async validateUser(userid: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { userid } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async login(userid: string, password: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(userid, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, userid: user.userid, username: user.username, role: user.role, point: user.point };
    return { access_token: this.jwtService.sign(payload) };
  }
}
