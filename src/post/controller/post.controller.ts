import { SharePostService } from './../service/share_post.service';
import { ReactionService } from './../service/reaction.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Param, Put, UseInterceptors } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Posts } from 'src/typeorm/entities/post';
import {
  CreatePostDto,
  GetPostByUserId,
  GetPostDto,
  GetPostWithCommentDto,
} from 'src/types/post_types/post.dto';
import { PostService } from '../service/post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly reactionService: ReactionService,
    private readonly sharePostService: SharePostService,
  ) {}

  @Get('all')
  async getAllPost(): Promise<Posts[]> {
    return await this.postService.getAllPosts();
  }

  @Get(':id')
  async getOnePost(@Param() params): Promise<GetPostWithCommentDto> {
    return await this.postService.getOnePost(params.id);
  }

  @Get('shared/:id')
  async getSharedPostByUserId(@Param() params: any): Promise<GetPostDto[]> {
    return await this.sharePostService.getSharedPostByUserId(params?.id);
  }

  @Get('user/:id')
  async getPostByUserId(@Param() params): Promise<GetPostByUserId[]> {
    return await this.postService.getPostByUserId(params?.id);
  }

  @Post('search')
  async getPostsByTitle(@Body() content: string) {}

  @UseGuards(AuthGuard('jwt-at'))
  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return await this.postService.createPost(createPostDto, req.user);
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Post('reaction/:id')
  async reactionPost(@Req() req: any, @Param() params): Promise<boolean> {
    return await this.reactionService.toggleReaction(req?.user, params?.id);
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Post('share/:id')
  async sharePost(@Req() req: any, @Param() params: any) {
    return await this.sharePostService.createSharePost({
      user: req?.user,
      post_id: params?.id,
    });
  }

  @Get('count_reaction/:id')
  async countReaction(@Param() params): Promise<number> {
    return await this.reactionService.countReaction(params?.id);
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Get('isReacted/:id')
  async isReacted(@Req() req: any, @Param() params): Promise<boolean> {
    return await this.reactionService.isReacted(params?.id, req?.user);
  }

  // @UseGuards(AuthGuard('jwt-at'))
  // @Put(':id')
  // updatePostById(
  //   @Param() params,
  //   @Body() updatePostDto: UpdatePostDto,
  //   @Req() req: any,
  // ): Promise<GetPostDto> {
  //   return this.postService.updatePostById(params.id, updatePostDto, req.user);
  // }
}
