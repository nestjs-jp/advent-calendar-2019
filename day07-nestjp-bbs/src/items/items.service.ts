import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { CommentsService } from '../comments/comments.service';

export interface Item {
  id: number;
  title: string;
  body: string;
  deletePassword: string;
  createdAt: number;
}

@Injectable()
export class ItemsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly commentsService: CommentsService,
  ) {}

  async findItemById(id: number): Promise<Item | null> {
    const items = await this.getItems();
    return items.find(item => item.id === id);
  }

  async getItems(): Promise<Item[]> {
    const { data } = await this.httpService
      .get('http://localhost:3308/items')
      .toPromise<AxiosResponse<Item[]>>();
    return data;
  }

  async createItem(
    item: Omit<Omit<Item, 'createdAt'>, 'id'>,
  ): Promise<AxiosResponse<void>> {
    return this.httpService
      .post('http://localhost:3308/items', {
        ...item,
        createdAt: dayjs().unix(),
      })
      .toPromise();
  }

  async deleteItemByPassword(
    id: number,
    deletePassword: string,
  ): Promise<void> {
    const targetItem = await this.findItemById(id);
    if (!targetItem) {
      return Promise.reject(new Error('Missing Item.'));
    }
    if (targetItem.deletePassword !== deletePassword) {
      return Promise.reject(new Error('Incorrect password'));
    }
    await this.httpService
      .delete(`http://localhost:3308/items/${id}`)
      .toPromise();
    return;
  }
}
