import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/user/graphql-types/objects/user.model';

@ObjectType()
export class RoomMemberEdge {
  @Field(() => String, { description: 'このエッジを一意に識別するカーソル' })
  cursor: string;

  @Field(() => User, { description: '参加者' })
  node: User;

  @Field(() => Date, { description: '参加日時' })
  joinedAt: Date;

  @Field(() => User, {
    nullable: true,
    description: '招待者（自主参加の場合はnull）',
  })
  invitedBy?: User;
}
