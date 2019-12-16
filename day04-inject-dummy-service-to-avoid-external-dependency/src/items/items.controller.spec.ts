import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsModule } from './items.module';

class DummyItemsService {
  async createItem(title: string, body: string, deletePassword: string) {
    return;
  }
  async getItems() {
    const item = {
      id: 1,
      title: 'Dummy Title',
      body: 'Dummy Body',
    };
    return [item];
  }
}

const dummyItemsService = {
  async createItem(title: string, body: string, deletePassword: string) {
    return;
  },
  async getItems() {
    const item = {
      id: 1,
      title: 'Dummuy Title',
      body: 'Dummy Body',
    };
    return [item];
  },
};

describe('ItemsController', () => {
  let itemsController: ItemsController;
  let itemsService: ItemsService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [ItemsModule],
    })
      .overrideProvider(ItemsService)
      .useClass(DummyItemsService)
      // .useValue(dummyItemsService)
      .compile();

    itemsService = testingModule.get<ItemsService>(ItemsService);
    itemsController = new ItemsController(itemsService);
  });

  describe('/items', () => {
    it('should return items', async () => {
      expect(await itemsController.getItems()).toHaveLength(1);
    });
  });
});
