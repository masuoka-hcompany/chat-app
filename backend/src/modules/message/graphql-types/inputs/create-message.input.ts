import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field(() => ID, { description: 'チャットルーム ID' })
  @IsUUID()
  roomId: string;

  @Field(() => ID, { description: '投稿ユーザー ID' })
  @IsUUID()
  senderId: string;

  @Field(() => String, { description: 'メッセージ内容' })
  contents: string;
}
