import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from '../../../user/graphql-types/objects/user.model';

@ObjectType()
export class Room {
  @Field(() => ID, { nullable: false, description: 'チャットルーム ID' })
  id!: string;

  @Field(() => String, { nullable: false, description: 'チャットルーム名' })
  name!: string;

  @Field(() => String, { nullable: true, description: '説明' })
  description!: string | null;

  @Field(() => Date, { nullable: false, description: '作成日時' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '更新日時' })
  updatedAt!: Date;

  @Field(() => User, { nullable: false, description: '作成ユーザー' })
  creator?: User;

  @Field(() => User, { nullable: false, description: '更新ユーザー' })
  updater?: User;
}
