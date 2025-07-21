import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserStatus } from '../../modules/user-status/graphql-types/user-status.model';
import { Profile } from './profile.model';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false, description: 'ユーザー ID' })
  id!: string;

  @Field(() => String, { nullable: false, description: 'メールアドレス' })
  email!: string;

  @Field(() => Date, { nullable: false, description: '作成日時' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '更新日時' })
  updatedAt!: Date;

  @Field(() => UserStatus, {
    nullable: false,
    description: 'ユーザーステータス',
  })
  userStatus?: UserStatus;

  @Field(() => Profile, { nullable: true, description: 'プロフィール' })
  profile?: Profile | null;
}
