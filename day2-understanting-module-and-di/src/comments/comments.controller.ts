import { Controller, Post, Query } from '@nestjs/common';
import { Comment, CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  getCommentsByItemId(@Query() query: { itemId: number }): Comment[] {
    return this.commentsService.getCommentsByItemId(query.itemId);
  }
}
