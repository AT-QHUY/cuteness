import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  GetUserDto,
  LoginUserDto,
} from 'src/types/user_class/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/types/auth_types/token.type';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/types/auth_types/jwt.payload';
import { User } from 'src/typeorm/entities/user';
import { UpdateResult } from 'typeorm';
import { InvalidTokenException } from 'src/exception/invalid_token.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async register(userDto: CreateUserDto): Promise<Tokens> {
    const user = await this.userService.createUser(userDto);

    const token = await this._createToken(user.user_id, user.email);

    return {
      ...token,
    };
  }

  async login(userDto: LoginUserDto) {
    const user = await this.userService.findByEmailandPassword(userDto);

    const token = await this._createToken(user.user_id, user.email);

    return {
      ...token,
    };
  }

  async logout({ user_id }: User): Promise<boolean> {
    const updateResult = await this.userService.clearTokens(user_id);

    if (updateResult.affected != 1)
      throw new HttpException('Unable to logout', HttpStatus.ACCEPTED);
    return true;
  }

  async validateUserAccessToken(email, access_token) {
    const user: User = await this.userService.findByEmail(email);

    if (!user) {
      throw new InvalidTokenException();
    }

    if (user.access_token === '') {
      throw new InvalidTokenException();
    }

    if (user.access_token != access_token) {
      await this.userService.clearTokens(user.user_id);
      throw new InvalidTokenException();
    }
    return user;
  }

  async validateUserRefreshToken(email, refresh_token) {
    const user: User = await this.userService.findByEmail(email);

    if (!user) {
      throw new InvalidTokenException();
    }

    if (user.access_token === '') {
      throw new InvalidTokenException();
    }

    if (user.refresh_token != refresh_token) {
      await this.userService.clearTokens(user.user_id);
      throw new InvalidTokenException();
    }
    return user;
  }

  async refreshTokenHash({ user_id, email }): Promise<Tokens> {
    return await this._createToken(user_id, email);
  }

  private async _createToken(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      user_id: userId,
      email,
    };

    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('REFRESHKEY'),
        expiresIn: '7d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('SECRETKEY'),
        expiresIn: '1h',
      }),
    ]);

    this.userService.findAndUpdateTokensById(userId, accessToken, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
