import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  validateUser(username: string, password: string): boolean {
    // 하드코딩된 관리자 계정
    return username === 'admin' && password === '1234';
  }

  login(username: string, password: string): { access_token: string } {
    if (!this.validateUser(username, password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
