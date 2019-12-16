import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';

@Injectable()
export class ItemsService {
  connection: Connection;

  constructor() {
    createConnection({
      type: 'mysql',
      host: '0.0.0.0',
      port: 3306,
      username: 'root',
      database: 'test',
    })
      .then(connection => {
        this.connection = connection;
      })
      .catch(e => {
        throw e;
      });
  }

  // connection が確立していないタイミングがあるため待ち受ける
  private async waitToConnect() {
    if (this.connection) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.waitToConnect();
  }

  async createItem(title: string, body: string, deletePassword: string) {
    if (!this.connection) {
      await this.waitToConnect();
    }
    await this.connection.query(
      `INSERT INTO items (title, body, deletePassword) VALUE (?, ?, ?)`,
      [title, body, deletePassword],
    );
  }

  async getItems() {
    if (!this.connection) {
      await this.waitToConnect();
    }
    const rawItems = await this.connection.query('SELECT * FROM items');
    const items = rawItems.map(rawItem => {
      const item = { ...rawItem };
      delete item.deletePassword;

      return item;
    });

    return items;
  }
}
