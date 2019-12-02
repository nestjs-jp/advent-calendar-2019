import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let commentsService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  describe('getCommentsByItemId', () => {
    it('should return comments if exist', () => {
      const comments = commentsService.getCommentsByItemId(1);
      expect(comments.length).toBeTruthy();
    });

    it('should return empty array if not exist', () => {
      const comments = commentsService.getCommentsByItemId(0);
      expect(comments).toHaveLength(0);
    });
  });
});
