import { Controller, Post, Body } from '@nestjs/common';
import { CreateItemDTO } from './items.dto';

@Controller('items')
export class ItemsController {
  @Post()
  createItem(@Body() createItemDTO: CreateItemDTO): boolean {
    return true;
  }
}
