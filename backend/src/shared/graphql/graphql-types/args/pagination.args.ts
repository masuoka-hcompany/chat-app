import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, description: '取得する最初の件数' })
  first?: number;

  @Field(() => Int, { nullable: true, description: '取得する最後の件数' })
  last?: number;

  @Field(() => String, {
    nullable: true,
    description: 'ページネーション用のカーソル（次ページ）',
  })
  after?: string;

  @Field(() => String, {
    nullable: true,
    description: 'ページネーション用のカーソル（前ページ）',
  })
  before?: string;
}
