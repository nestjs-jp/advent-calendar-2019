import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';

@Module({
  imports: [],
  controllers: [AppController, ItemsController],
  providers: [AppService],
})
export class AppModule {}
