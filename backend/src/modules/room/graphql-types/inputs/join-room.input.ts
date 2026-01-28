import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class JoinRoomInput {
  @Field(() => ID, { description: '参加するチャットルーム ID' })
  roomId: string;
}
