import { Field, ObjectType, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { User } from 'src/modules/user/graphql-types/objects/user.model';
import { MessageType } from './message-type.model';

@ObjectType()
export class Message {
  @Field(() => ID, { nullable: false, description: 'メッセージ ID' })
  id!: string;

  @Field(() => User, { nullable: false, description: '投稿ユーザー' })
  sender?: User;

  @Field(() => MessageType, {
    nullable: false,
    description: 'メッセージタイプ',
  })
  messageType?: MessageType;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'メタデータ（システムメッセージ用の追加情報）',
  })
  metadata!: any | null;

  @Field(() => String, { nullable: false, description: 'メッセージ内容' })
  contents!: string;

  @Field(() => Date, { nullable: false, description: '作成日時' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '更新日時' })
  updatedAt!: Date;
}
