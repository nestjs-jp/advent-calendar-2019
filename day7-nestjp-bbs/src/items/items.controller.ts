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
import { CreateItemDTO, DeleteItemDTO, CreateCommentDTO } from './items.dto';
import { CommentsService } from '../comments/comments.service';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  async getItemsWithComments() {
    const [items, comments] = await Promise.all([
      this.itemsService.getItems(),
      this.commentsService.getComments(),
    ]);

    return await Promise.all(
      items.map(async item => {
        return {
          ...item,
          comments: comments.filter(comment => comment.itemId === item.id),
        };
      }),
    );
  }

  @Post()
  async createItem(@Body() createItemDTO: CreateItemDTO) {
    const item = await this.itemsService.createItem({ ...createItemDTO });

    return;
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
      await this.itemsService.deleteItemByPassword(
        +itemId,
        deleteItemDTO.deletePassword,
      );
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

  @Post(':itemId/comments')
  async createCommentToItem(
    @Param('itemId') itemId: string,
    @Body() createCommentDTO: CreateCommentDTO,
  ): Promise<void> {
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

    await this.commentsService.createComment({ ...createCommentDTO });
    return;
  }
}
