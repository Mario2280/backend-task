import { Controller, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  create(@Body() { description, publisherId, taskId }: CreateCommentDto) {
    return this.commentService.addComment(+publisherId, description, +taskId);
  }
}
