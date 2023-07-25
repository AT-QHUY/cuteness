import {
  SearchUserByNameDto,
  UpdateUserAvatarDto,
  UpdateUserDto,
} from './../../types/user_class/user.dto';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, GetUserDto } from 'src/types/user_class/user.dto';
import { UserService } from '../service/user.service';
import { Post } from '@nestjs/common/decorators';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt-at'))
  @Get()
  getUser(@Req() req: any) {
    return this.userService.convertUserToDTO(req.user);
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Get('dto')
  async getUserDTO(@Req() req: any): Promise<GetUserDto> {
    return await this.userService.findUserDTOByToken(req.user);
  }

  @Get(':id')
  async getUserById(@Param() params): Promise<GetUserDto> {
    return await this.userService.findUserDtoById(params.id);
  }

  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Get('all')
  getAllUser() {
    return this.userService.findAllUsers();
  }

  @Post('search')
  async searchUsersByName(
    @Body() searchParam: SearchUserByNameDto,
  ): Promise<GetUserDto[]> {
    return await this.userService.searchByName(searchParam.name);
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Put('update')
  async updateUserByID(
    @Body() userDTO: UpdateUserDto,
    @Req() req: any,
  ): Promise<GetUserDto> {
    return await this.userService.updateUserByID(req.user, userDTO);
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Put('update_avatar')
  async updateUserAvatar(
    @Body() newAvatar: UpdateUserAvatarDto,
    @Req() req: any,
  ): Promise<GetUserDto> {
    return await this.userService.updateUserAvatar(req.user, newAvatar);
  }
}
