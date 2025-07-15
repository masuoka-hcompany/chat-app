import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MessageEdge } from './message-edge.model';
import { PageInfo } from 'src/shared/graphql/graphql-types/objects/page-info.model';

@ObjectType()
export class MessageConnection {
  @Field(() => [MessageEdge], { description: 'メッセージのエッジのリスト' })
  edges: MessageEdge[];

  @Field(() => PageInfo, { description: 'ページ情報' })
  pageInfo: PageInfo;

  @Field(() => Int, { description: '全体のアイテム数' })
  totalCount: number;
}
