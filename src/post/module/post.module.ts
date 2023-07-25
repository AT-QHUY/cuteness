import { HashTagService } from './../service/hashtag.service';
import { Reaction } from './../../typeorm/entities/reaction';
import { CategoryService } from './../../category/service/category.service';
import { Category } from './../../typeorm/entities/category';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/post';
import { PostContent } from 'src/typeorm/entities/post_content';
import { UserModule } from 'src/user/user.module';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';
import { PostContentService } from '../service/post_content.service';
import { ReactionService } from '../service/reaction.service';
import { Share_Post } from 'src/typeorm/entities/share_post';
import { SharePostService } from '../service/share_post.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Posts,
      PostContent,
      Category,
      Reaction,
      Share_Post,
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostContentService,
    CategoryService,
    ReactionService,
    HashTagService,
    SharePostService,
  ],
})
export class PostModule {}
