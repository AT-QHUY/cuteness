import { Injectable } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import {
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InvalidTokenException } from 'src/exception/invalid_token.exception';
import { User } from 'src/typeorm/entities/user';
import { JwtPayload } from 'src/types/auth_types/jwt.payload';
import { AuthService } from '../service/auth.service';

@Injectable()
export class Refreshstrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESHKEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, { email, user_id }: JwtPayload): Promise<User> {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    const user: User = await this.authService.validateUserRefreshToken(
      email,
      refreshToken,
    );

    if (!user) {
      throw new InvalidTokenException();
    }

    return user;
  }
}
