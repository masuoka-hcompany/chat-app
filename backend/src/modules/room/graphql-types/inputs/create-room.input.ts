import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => String, { description: 'チャットルーム名' })
  name: string;

  @Field(() => String, { nullable: true, description: '説明' })
  description?: string;
}
