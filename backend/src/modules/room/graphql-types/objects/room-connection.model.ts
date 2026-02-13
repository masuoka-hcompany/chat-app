import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PageInfo } from 'src/shared/graphql/graphql-types/objects/page-info.model';
import { RoomEdge } from './room-edge.model';

@ObjectType()
export class RoomConnection {
  @Field(() => PageInfo, { description: 'ページ情報' })
  pageInfo: PageInfo;

  @Field(() => [RoomEdge], {
    description: 'チャットルームのエッジのリスト',
  })
  edges: RoomEdge[];

  @Field(() => Int, { description: '全体のアイテム数' })
  totalCount: number;
}
