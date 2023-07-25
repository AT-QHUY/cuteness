import { Friend } from './../typeorm/entities/friend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/user.controller';
import { User } from '../typeorm/entities/user';
import { UserService } from './service/user.service';
import { Role } from 'src/typeorm/entities/role_type';
import { StatusType } from 'src/typeorm/entities/status_type';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { FriendController } from './controller/friend.controller';
import { FriendService } from './service/friend.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Role, StatusType, Friend])],
  controllers: [UsersController, FriendController],
  providers: [UserService, ConfigService, RolesGuard, FriendService],
  exports: [UserService],
})
export class UserModule {}
