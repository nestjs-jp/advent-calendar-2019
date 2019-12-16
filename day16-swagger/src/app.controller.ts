import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetItemsResponse, GetItemsRequest } from './dto/item.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/item')
  @ApiResponse({ status: HttpStatus.OK, type: GetItemsResponse })
  getItems(@Query() { ids }: GetItemsRequest): GetItemsResponse {
    return { items: [] };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
