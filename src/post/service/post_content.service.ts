import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/post';
import { PostContent } from 'src/typeorm/entities/post_content';
import { createPostContentParam } from 'src/types/post_types/post.type';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class PostContentService {
  constructor(
    @InjectRepository(PostContent)
    private postContentRepository: Repository<PostContent>,
  ) {}

  async createPostContent(
    contents: string[],
    post_id: number,
  ): Promise<InsertResult> {
    const postContentParams: createPostContentParam[] = contents.map((item) => {
      return { content: item, post_id };
    });
    return await this.postContentRepository.insert(postContentParams);
  }

  async getPostContent(post_id: number) {
    return await this.postContentRepository.findOne({
      where: {
        post_id: post_id,
      },
    });
  }
}
