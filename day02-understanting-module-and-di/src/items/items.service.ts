import { Injectable } from '@nestjs/common';

export interface Item {
  id: number;
  title: string;
  body: string;
  deletePassword: string;
}

export type PublicItem = Omit<Item, 'deletePassword'>;

const items: Item[] = [
  {
    id: 1,
    title: 'Item title',
    body: 'Hello, World',
    deletePassword: '1234',
  },
];

@Injectable()
export class ItemsService {
  getAllItems(): Item[] {
    return [...items];
  }

  getPublicItems(): PublicItem[] {
    return this.getAllItems().map(item => {
      const publicItem = { ...item };
      delete publicItem.deletePassword;
      return publicItem;
    });
  }

  getItemById(id: number): PublicItem | undefined {
    return this.getPublicItems().find(item => item.id === id);
  }
}
