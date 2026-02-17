import { ObjectType, Field } from '@nestjs/graphql';
import { Room } from './room.model';

@ObjectType()
export class RoomEdge {
  @Field(() => String, { description: 'このエッジを一意に識別するカーソル' })
  cursor: string;

  @Field(() => Room, { description: 'チャットルーム' })
  node: Room;
}
