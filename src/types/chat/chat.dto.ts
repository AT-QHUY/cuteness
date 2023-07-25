import { IsNotEmpty, IsNumber } from 'class-validator';
export class createChatRoomParams {
  @IsNotEmpty()
  @IsNumber()
  firstUserId: number;

  @IsNotEmpty()
  @IsNumber()
  secondUserId: number;
}
