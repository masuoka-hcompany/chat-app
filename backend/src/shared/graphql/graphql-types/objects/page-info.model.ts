import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => Boolean, { description: '次のページが存在するか' })
  hasNextPage: boolean;

  @Field(() => Boolean, { description: '前のページが存在するか' })
  hasPreviousPage: boolean;

  @Field(() => String, {
    nullable: true,
    description: '現在のページで最初の要素のカーソル',
  })
  startCursor: string | null;

  @Field(() => String, {
    nullable: true,
    description: '現在のページで最後の要素のカーソル',
  })
  endCursor: string | null;
}
