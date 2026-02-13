import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RoomFilterInput {
  @Field(() => Boolean, { description: 'ルーム参加状況による絞り込み' })
  joinedByMe: boolean;
}
