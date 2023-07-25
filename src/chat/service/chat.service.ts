import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Conversation } from 'src/typeorm/shema/conversation';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModal: Model<Conversation>,
  ) {}

  async createChatRoom(
    firstUserId: number,
    secondUserId: number,
  ): Promise<Document> {
    const createdChatRoom = new this.conversationModal({
      participants: [firstUserId, secondUserId],
    });

    return await createdChatRoom.save();
  }
}
