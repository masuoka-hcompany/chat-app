import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from 'src/shared/graphql/graphql-types/objects/page-info.model';
import { UserEdge } from './user-edge.model';

@ObjectType()
export class UserConnection {
  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [UserEdge])
  edges: UserEdge[];

  @Field(() => Int)
  totalCount: number;
}
