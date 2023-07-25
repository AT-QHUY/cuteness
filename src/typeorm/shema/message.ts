import { Schema, Types, Document } from 'mongoose';
import { Conversation } from './conversation';

const { ObjectId } = Types;

const MessageSchema = new Schema(
  {
    sender: [Number],
    content: [Number],
    conversation: { type: ObjectId, ref: 'Conversation' },
  },
  {
    timestamps: true,
    collection: 'messages',
  },
);

export { MessageSchema };

export interface Message extends Document {
  sender: [Number];
  content: [Number];
  conversation: Conversation;
}
