import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class JoinRoomInput {
  @Field(() => ID, { description: '参加するチャットルーム ID' })
  @IsUUID()
  roomId: string;
}
