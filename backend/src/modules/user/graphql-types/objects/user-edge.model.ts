import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserEdge {
  @Field()
  cursor: string;

  @Field(() => User)
  node: User;
}
