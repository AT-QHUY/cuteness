import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/service/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth.controller';
import { RolesGuard } from './guard/role.guard';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/at.strategy';
import { Refreshstrategy } from './strategy/rt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRED'),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    JwtStrategy,
    Refreshstrategy,
    RolesGuard,
  ],
  exports: [JwtStrategy, Refreshstrategy, RolesGuard],
})
export class AuthModule {}
