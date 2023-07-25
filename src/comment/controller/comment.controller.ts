import { CreateCommentParam } from './../../types/comment_types/comment.type';
import { CommentService } from './../service/comment.service';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Post, Req, UseGuards, Body, Get } from '@nestjs/common/decorators';
import { Param } from '@nestjs/common/decorators';
import { GetCommentDto } from 'src/types/comment_types/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Get(':id')
  getAll(@Param() params): Promise<GetCommentDto[]> {
    return this.commentService.getByPostId(params?.id);
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Post('create/:id')
  async createComment(
    @Param() params,
    @Req() req: any,
    @Body() createCommentParam: CreateCommentParam,
  ): Promise<number> {
    return await this.commentService.createComment(
      req?.user,
      params?.id,
      createCommentParam,
    );
  }
}
