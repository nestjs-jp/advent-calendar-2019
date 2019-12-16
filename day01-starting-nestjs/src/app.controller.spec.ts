import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, PublicItem } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('/items', () => {
    it('should return public items', () => {
      jest.spyOn(appService, 'getPublicItems').mockImplementation(() => {
        const item: PublicItem = {
          id: 1,
          title: 'Mock Title',
          body: 'Mock Body',
        };
        return [item];
      });
      expect(appController.getItems()).toHaveLength(1);
    });
  });
});
