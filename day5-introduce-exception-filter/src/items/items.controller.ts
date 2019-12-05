import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
  HttpService,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDTO, DeleteItemDTO } from './items.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItems() {
    const items = await this.itemsService.getItems();

    return items;
  }

  @Post()
  async createItem(@Body() { title, body, deletePassword }: CreateItemDTO) {
    const item = await this.itemsService.createItem(
      title,
      body,
      deletePassword,
    );

    return item;
  }

  @Post(':itemId/delete')
  async deleteItem(
    @Param('itemId') itemId: string,
    @Body() deleteItemDTO: DeleteItemDTO,
  ) {
    const item = this.itemsService.findItemById(+itemId);

    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Missing item(id: ${itemId}).`,
        },
        404,
      );
    }

    try {
      await this.itemsService.deleteItemByPassword(+itemId, deleteItemDTO.deletePassword);
    } catch (e) {
      if (e.message === 'Incorrect password') {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Incorrect password',
          },
          403,
        );
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error.',
        },
        500,
      );
    }
    return;
  }
}
