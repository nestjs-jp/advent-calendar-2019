import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('config')
  getConfig() {
    return this.usersService.getUserConfig('hoge4js');
  }

  @Get('login')
  login() {
    return this.authService.login('foo', 'baz')
  }
}
