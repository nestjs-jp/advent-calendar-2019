import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let itemsService: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(itemsService).toBeDefined();
  });

  describe('getPublicItems', () => {
    it('should have deletePassword removed', () => {
      const publicItems = itemsService.getPublicItems();
      expect(publicItems.every(item => !('deletePassword' in item))).toBe(true);
    });
  });

  describe('getItemById', () => {
    it('should return item if exist', () => {
      expect(itemsService.getItemById(1)).toBeDefined();
    });

    it('should return undefined if not exist', () => {
      expect(itemsService.getItemById(0)).toBeUndefined();
    });
  });
});
