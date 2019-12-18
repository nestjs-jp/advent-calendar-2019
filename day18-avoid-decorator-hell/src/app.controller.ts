import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { User, UserInterface } from './models/user';
import { ApiResponse } from '@nestjs/swagger';
import { validate } from 'class-validator';

@Controller()
export class AppController {
  @Get()
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400 })
  async getUser(
    @Query() { displayId, name }: { displayId: string; name: string },
  ): Promise<UserInterface> {
    if (!displayId || !name) {
      throw new HttpException('displayId and name are required', 400);
    }

    const user = new User({ id: 123, displayId, name });

    const errs = await validate(user, { skipMissingProperties: true });

    if (errs.length) {
      console.error(errs);
      throw new HttpException(errs, 400);
    }

    console.log(user);

    return user.toObject();
  }
}
