import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class InviteUserToRoomInput {
  @Field(() => ID, { description: '招待先のチャットルーム ID' })
  roomId: string;

  @Field(() => ID, { description: '招待するユーザー ID' })
  userId: string;
}
