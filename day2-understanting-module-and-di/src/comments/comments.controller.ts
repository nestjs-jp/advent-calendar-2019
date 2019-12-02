import { Controller, Get, Query } from '@nestjs/common';
import { Comment, CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getCommentsByItemId(@Query() query: { itemId: string }): Comment[] {
    return this.commentsService.getCommentsByItemId(+query.itemId);
  }
}
