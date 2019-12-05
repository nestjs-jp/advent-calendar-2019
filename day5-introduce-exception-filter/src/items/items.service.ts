import { Injectable } from '@nestjs/common';

export interface Item {
  id: number;
  title: string;
  body: string;
  deletePassword: string;
}

let items = [
  {
    id: 1,
    title: 'Item #1',
    body: '#1 body',
    deletePassword: '1234',
  },
];

@Injectable()
export class ItemsService {
  findItemById(id: number): Item | null {
    return items.find(item => item.id === id);
  }

  getItems() {
    return items.map(item => item);
  }

  createItem(title: string, body: string, deletePassword: string) {
    return;
  }

  async deleteItemByPassword(id: number, deletePassword: string): Promise<void> {
    const targetItem = this.findItemById(id);
    if (!targetItem) {
      return Promise.reject(new Error('Missing Item.'));
    }
    if (targetItem.deletePassword !== deletePassword) {
      return Promise.reject(new Error('Incorrect password'));
    }
    items = items.filter(i => i.id !== targetItem.id);
    return;
  }
}
