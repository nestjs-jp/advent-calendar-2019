import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

export interface Comment {
  id: number;
  itemId: number;
  body: string;
  createdAt: number;
}

@Injectable()
export class CommentsService {
  constructor(private readonly httpService: HttpService) {}

  async findCommentById(id: number): Promise<Comment | null> {
    const comments = await this.getComments();
    return comments.find(comment => comment.itemId === id);
  }

  async getComments(): Promise<Comment[]> {
    const { data } = await this.httpService
      .get('http://localhost:3308/comments')
      .toPromise<AxiosResponse<Comment[]>>();
    return data;
  }

  async createComment(
    comment: Omit<Omit<Comment, 'createdAt'>, 'id'>,
  ): Promise<AxiosResponse<void>> {
    return this.httpService
      .post('http://localhost:3308/comments', {
        ...comment,
        createdAt: dayjs().unix(),
      })
      .toPromise();
  }
}
