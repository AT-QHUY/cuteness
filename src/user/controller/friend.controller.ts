import { Friend } from 'src/typeorm/entities/friend';
import { FriendService } from './../service/friend.service';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import {
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Param,
  Req,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @UseGuards(AuthGuard('jwt-at'))
  @Get('create/:id')
  async createFriend(@Param() params: any, @Req() req: any): Promise<Friend> {
    return await this.friendService.createFriend({
      user: req?.user,
      follower_id: params?.id,
    });
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Get('check/:id')
  async checkFriend(@Param() params: any, @Req() req: any): Promise<boolean> {
    return await this.friendService.checkFriend({
      user: req?.user,
      follower_id: params?.id,
    });
  }
}
