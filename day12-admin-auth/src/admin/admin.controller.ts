import { Controller, UseGuards, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login() {
    return this.adminService.sign();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/status')
  status() {
    return true;
  }
}
