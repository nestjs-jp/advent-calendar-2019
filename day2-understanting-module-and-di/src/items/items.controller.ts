import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService, PublicItem } from './items.service';
import { Comment, CommentsService } from '../comments/comments.service';

interface GetItemWithCommentsResponseType {
  item: PublicItem;
  comments: Comment[];
}

@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  getItems(): PublicItem[] {
    return this.itemsService.getPublicItems();
  }

  @Get(':id/comments')
  getItemWithComments(@Param()
  param: {
    id: number;
  }): GetItemWithCommentsResponseType {
    const item = this.itemsService.getItemById(param.id);
    const comments = this.commentsService.getCommentsByItemId(param.id);

    return { item, comments };
  }
}
