import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => ID, { nullable: false, description: 'ユーザー ID' })
  userId!: string;

  @Field(() => String, { nullable: false, description: 'ユーザー名' })
  name!: string;

  @Field(() => String, { nullable: true, description: 'プロフィール画像' })
  profileImageUrl!: string | null;

  @Field(() => Date, { nullable: false, description: '作成日時' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '更新日時' })
  updatedAt!: Date;
}
