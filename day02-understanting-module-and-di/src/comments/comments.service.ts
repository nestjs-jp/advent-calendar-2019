import { Injectable } from '@nestjs/common';

export interface Comment {
  id: number;
  itemId: number;
  body: string;
}

const comments: Comment[] = [
  {
    id: 1,
    itemId: 1,
    body: 'Hello, I am Alice',
  },
  {
    id: 2,
    itemId: 1,
    body: 'Hello, I am Beth',
  },
  {
    id: 3,
    itemId: 2,
    body: 'That is also love.',
  },
];

@Injectable()
export class CommentsService {
  getCommentsByItemId(itemId: number): Comment[] {
    return comments.filter(comment => comment.itemId === itemId);
  }
}
