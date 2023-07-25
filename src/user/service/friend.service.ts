import { NotFoundException } from 'src/exception/no_content.exception';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'src/typeorm/entities/friend';
import { User } from 'src/typeorm/entities/user';
import { CreateFriendParam, FriendStatus } from 'src/types/friend/friend';
import { Repository } from 'typeorm';
import { UnableToCreateException } from 'src/exception/not_modified.exception';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend) private friendRepository: Repository<Friend>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createFriend({
    user,
    follower_id,
  }: CreateFriendParam): Promise<Friend> {
    if (user.user_id == follower_id) throw new UnableToCreateException();

    const follower: User = await this.userRepository.findOne({
      where: {
        user_id: follower_id,
      },
    });

    if (!follower) throw new UnableToCreateException();

    var tmpFriend: Friend = await this.friendRepository.findOne({
      where: {
        user: { user_id: user.user_id },
        follower: { user_id: follower_id },
      },
    });

    if (!tmpFriend) {
      tmpFriend = this.friendRepository.create({
        user,
        follower,
        status: FriendStatus.Active,
      });

      return await this.friendRepository.save(tmpFriend);
    }

    const newStatus =
      tmpFriend.status == FriendStatus.Active
        ? FriendStatus.Inactive
        : FriendStatus.Active;

    return await this.friendRepository.save({
      ...tmpFriend,
      create_at: new Date(),
      status: newStatus,
    });
  }

  async checkFriend({
    user,
    follower_id,
  }: CreateFriendParam): Promise<boolean> {
    if (user.user_id == follower_id) throw new UnableToCreateException();

    const follower: User = await this.userRepository.findOne({
      where: {
        user_id: follower_id,
      },
    });

    if (!follower) throw new NotFoundException();

    const result: Friend = await this.friendRepository.findOne({
      where: {
        user: { user_id: user.user_id },
        follower: { user_id: follower_id },
      },
    });

    if (result && result.status == FriendStatus.Active) return true;
    else return false;
  }
}
