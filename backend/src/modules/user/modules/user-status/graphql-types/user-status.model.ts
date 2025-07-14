import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class UserStatus {
  @Field(() => ID, { nullable: false, description: 'ユーザーステータス ID' })
  id!: string;

  @Field(() => String, { nullable: false, description: 'ユーザーステータス名' })
  name!: string;

  @Field(() => Int, { defaultValue: 0, nullable: false, description: '並び順' })
  sortNo!: number;

  @Field(() => Date, { nullable: false, description: '作成日時' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '更新日時' })
  updatedAt!: Date;
}
