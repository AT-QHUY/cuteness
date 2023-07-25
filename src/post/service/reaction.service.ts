import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/typeorm/entities/reaction';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
  ) {}

  async toggleReaction(user: User, post_id: number): Promise<boolean> {
    const reaction = await this.reactionRepository.findOne({
      where: {
        user: {
          user_id: user.user_id,
        },
        post: {
          post_id: post_id,
        },
      },
    });

    if (reaction) {
      await this.reactionRepository.remove(reaction);
    } else {
      var newReaction = this.reactionRepository.create({
        post: {
          post_id: post_id,
        },
        user: {
          user_id: user.user_id,
        },
      });

      this.reactionRepository.save(newReaction);
      return true;
    }
  }

  async countReaction(post_id: number): Promise<number> {
    const result = await this.reactionRepository.count({
      where: {
        post: {
          post_id,
        },
      },
    });
    return result;
  }

  async isReacted(post_id: number, user: User): Promise<boolean> {
    const result = await this.reactionRepository.findOne({
      where: {
        post: {
          post_id,
        },
        user_id: user.user_id,
      },
    });

    if (result) return true;
    return false;
  }
}
