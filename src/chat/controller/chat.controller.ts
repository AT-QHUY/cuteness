import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { Document } from 'mongoose';
import { createChatRoomParams } from 'src/types/chat/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async createChatRoom(
    @Body() { firstUserId, secondUserId }: createChatRoomParams,
  ): Promise<Document> {
    return await this.chatService.createChatRoom(firstUserId, secondUserId);
  }
}
