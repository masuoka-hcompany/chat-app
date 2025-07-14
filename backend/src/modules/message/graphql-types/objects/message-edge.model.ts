import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from './message.model';

@ObjectType()
export class MessageEdge {
  @Field({ description: 'このエッジを一意に識別するカーソル' })
  cursor: string;

  @Field(() => Message, { description: 'メッセージ' })
  node: Message;
}
