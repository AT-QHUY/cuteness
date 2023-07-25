import { Injectable } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ForbiddenException, HttpException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshException } from 'src/exception/refresh.exception';
import { JwtPayload } from 'src/types/auth_types/jwt.payload';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, { user_id, email }: JwtPayload) {
    const accessToken = req?.get('Authorization')?.replace('Bearer', '').trim();

    if (!accessToken) throw new ForbiddenException('Access token malformed');

    const user = this.authService.validateUserAccessToken(email, accessToken);

    if (!user) {
      throw new RefreshException();
    }

    return user;
  }
}
