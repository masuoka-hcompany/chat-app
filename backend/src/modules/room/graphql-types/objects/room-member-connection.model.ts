import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RoomMemberEdge } from './room-member-edge.model';
import { PageInfo } from 'src/shared/graphql/graphql-types/objects/page-info.model';

@ObjectType()
export class RoomMemberConnection {
  @Field(() => PageInfo, { description: 'ページ情報' })
  pageInfo: PageInfo;

  @Field(() => [RoomMemberEdge], {
    description: 'チャットルーム参加者のエッジのリスト',
  })
  edges: RoomMemberEdge[];

  @Field(() => Int, { description: '全体のアイテム数' })
  totalCount: number;
}
