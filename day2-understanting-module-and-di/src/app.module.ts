import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ItemsModule } from './items/items.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ItemsModule, CommentsModule],
  controllers: [AppController],
})
export class AppModule {}
