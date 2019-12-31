import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { generateRandomId } from '../../common/random';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return generateRandomId();
  }
}
