import { Module, HttpModule } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [CommentsModule, HttpModule],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
