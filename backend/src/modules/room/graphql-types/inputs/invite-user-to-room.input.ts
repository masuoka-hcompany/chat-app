import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class InviteUserToRoomInput {
  @Field(() => ID, { description: '招待先のチャットルーム ID' })
  @IsUUID()
  roomId: string;

  @Field(() => ID, { description: '招待するユーザー ID' })
  @IsUUID()
  userId: string;
}
