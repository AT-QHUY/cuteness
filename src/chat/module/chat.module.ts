import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MessageSchema } from 'src/typeorm/shema/message';
import { ConversationSchema } from 'src/typeorm/shema/conversation';
import { ChatController } from '../controller/chat.controller';
import { ChatService } from '../service/chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: MessageSchema,
      },
      {
        name: 'Conversation',
        schema: ConversationSchema,
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
