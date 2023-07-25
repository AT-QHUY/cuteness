import { Schema, Types, Document } from 'mongoose';

const { ObjectId } = Types;

const ConversationSchema = new Schema(
  {
    participants: [Number],
  },
  {
    timestamps: true,
    collection: 'conversations',
  },
);

export { ConversationSchema };

export interface Conversation extends Document {
  participants: [Number];
}
