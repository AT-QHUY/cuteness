import { Body, Controller, Post } from '@nestjs/common';
import { Delete, Get, Req, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Tokens } from 'src/types/auth_types/token.type';
import { CreateUserDto, LoginUserDto } from 'src/types/user_class/user.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.register(createUserDto);
  }

  @Post('signin')
  signIn(@Body() loginUserDto: LoginUserDto): Promise<Tokens> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard('jwt-rt'))
  @Get('refresh')
  refreshToken(@Req() req: any): Promise<Tokens> {
    return this.authService.refreshTokenHash(req.user);
  }

  @UseGuards(AuthGuard('jwt-at'))
  @Delete('logout')
  logout(@Req() req: any): Promise<boolean> {
    return this.authService.logout(req.user);
  }
}
