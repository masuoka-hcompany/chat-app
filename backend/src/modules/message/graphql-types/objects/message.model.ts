import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/modules/user/graphql-types/objects/user.model';

@ObjectType()
export class Message {
  @Field(() => ID, { nullable: false, description: 'メッセージ ID' })
  id!: string;

  @Field(() => User, { nullable: false, description: '投稿ユーザー' })
  sender?: User;

  @Field(() => String, { nullable: false, description: 'メッセージ内容' })
  contents!: string;

  @Field(() => Date, { nullable: false, description: '作成日時' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '更新日時' })
  updatedAt!: Date;
}
