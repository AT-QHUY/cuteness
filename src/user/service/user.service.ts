import {
  UpdateUserAvatarDto,
  UpdateUserDto,
} from './../../types/user_class/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserDto,
  GetUserDto,
  LoginUserDto,
} from 'src/types/user_class/user.dto';
import { Like, Repository, UpdateResult } from 'typeorm';
import { User } from '../../typeorm/entities/user';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { DuplicateDataException } from 'src/exception/not_modified.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<GetUserDto[]> {
    const users = await this.userRepository.find();

    // const newUsers = users.map((user) =>
    //   plainToInstance(GetUserDto, user, {
    //     excludeExtraneousValues: true,
    //   }),
    // );

    return plainToInstance(GetUserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async createUser(userDetails: CreateUserDto): Promise<GetUserDto> {
    userDetails.password = await this.hashMethod(userDetails.password);
    const tmpUser: User = await this.userRepository.findOne({
      where: {
        email: userDetails.email,
      },
    });

    if (tmpUser) {
      throw new DuplicateDataException();
    }

    const newUser = this.userRepository.create({
      ...userDetails,
      status: {
        status_id: 1,
      },
      role: {
        role_id: 1,
      },
    });

    const user = await this.userRepository.save(newUser);

    return plainToInstance(GetUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const tmpUser: User = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!tmpUser) {
      throw new HttpException('Email not exists', HttpStatus.BAD_REQUEST);
    }

    return tmpUser;
  }

  async findById(user_id: number): Promise<User> {
    const tmpUser: User = await this.userRepository.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (!tmpUser) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }

    return tmpUser;
  }

  async findUserDTOByToken(user: User): Promise<GetUserDto> {
    const tmpUser: User = await this.userRepository.findOne({
      where: {
        user_id: user.user_id,
      },
    });

    if (!tmpUser) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }

    return plainToInstance(GetUserDto, tmpUser, {
      excludeExtraneousValues: true,
    });
  }

  async findUserDtoById(user_id: number): Promise<GetUserDto> {
    const tmpUser: User = await this.userRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!tmpUser) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }

    return plainToInstance(GetUserDto, tmpUser, {
      excludeExtraneousValues: true,
    });
  }

  async findByEmailandPassword({ email, password }: LoginUserDto) {
    const tmpUser: User = await this.findByEmail(email);

    const isEqual = bcrypt.compareSync(password, tmpUser.password);

    if (!isEqual) {
      throw new HttpException('Password not correct', HttpStatus.UNAUTHORIZED);
    }

    return tmpUser;
  }

  async findAndUpdateTokensById(
    user_id: number,
    access_token: string,
    refresh_token: string,
  ) {
    const check = await this.userRepository.update(
      { user_id: user_id },
      {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    );

    if (!check) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }
  }

  convertUserToDTO(user: User): GetUserDto {
    return plainToInstance(GetUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async clearTokens(user_id: number): Promise<UpdateResult> {
    return await this.userRepository.update(
      { user_id: user_id },
      { access_token: '', refresh_token: '' },
    );
  }

  private hashMethod(password) {
    return bcrypt.hash(password, 10);
  }

  async updateUserByID(
    user: User,
    newUser: UpdateUserDto,
  ): Promise<GetUserDto> {
    var tmpUser: User = await this.userRepository.findOne({
      where: {
        user_id: user.user_id,
      },
    });

    tmpUser = {
      ...tmpUser,
      ...newUser,
    };

    const result: User = await this.userRepository.save(tmpUser);
    return plainToInstance(GetUserDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async updateUserAvatar(user: User, newAvatar: UpdateUserAvatarDto) {
    var tmpUser: User = await this.userRepository.findOne({
      where: {
        user_id: user.user_id,
      },
    });

    tmpUser = {
      ...tmpUser,
      ...newAvatar,
    };

    const result: User = await this.userRepository.save(tmpUser);
    return plainToInstance(GetUserDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async searchByName(username: string): Promise<GetUserDto[]> {
    var users: User[] = await this.userRepository.find({
      where: {
        name: Like(`%${username}%`),
      },
    });

    var newUsers = users.map((item) =>
      plainToInstance(GetUserDto, item, {
        excludeExtraneousValues: true,
      }),
    );

    return newUsers;
  }
}
