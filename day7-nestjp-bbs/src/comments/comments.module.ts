import { Module, HttpModule } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Module({
  imports: [HttpModule],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
