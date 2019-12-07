import { Module, HttpModule } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [HttpModule, ItemsModule, CommentsModule],
})
export class AppModule {}
