import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrmConfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/module/post.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/module/chat.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    CategoryModule,
    TypeOrmModule.forRoot(OrmConfig),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/cuteness'),
    ConfigModule.forRoot(),
    AuthModule,
    CategoryModule,
    CommentModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
