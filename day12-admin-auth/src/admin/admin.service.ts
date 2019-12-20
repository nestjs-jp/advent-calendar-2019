import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(private readonly jwtService: JwtService) {}
  sign() {
    return { access_token: this.jwtService.sign({ isAdmin: true }) };
  }
}
