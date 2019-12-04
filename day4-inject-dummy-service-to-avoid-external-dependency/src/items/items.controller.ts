import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateItemDTO } from './items.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() { title, body, deletePassword }: CreateItemDTO) {
    const item = await this.itemsService.createItem(
      title,
      body,
      deletePassword,
    );

    return item;
  }

  @Get()
  async getItems() {
    const items = await this.itemsService.getItems();

    return items;
  }
}
