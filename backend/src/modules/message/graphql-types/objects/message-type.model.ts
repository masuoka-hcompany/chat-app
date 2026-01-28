import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class MessageType {
  @Field(() => ID, { nullable: false, description: 'メッセージタイプ ID' })
  id!: string;

  @Field(() => String, { nullable: false, description: 'メッセージタイプ名' })
  name!: string;

  @Field(() => String, { nullable: true, description: '説明' })
  description!: string | null;

  @Field(() => Int, { defaultValue: 0, nullable: false, description: '並び順' })
  sortNo!: number;

  @Field(() => Date, { nullable: false, description: '作成日時' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '更新日時' })
  updatedAt!: Date;
}
