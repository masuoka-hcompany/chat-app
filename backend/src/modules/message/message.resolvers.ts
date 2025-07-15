import {
  Resolver,
  Query,
  Args,
  ID,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { ListMessagesByRoomUseCase } from './usecases/list-messages-by-room.usecase';
import { MessageConnection } from './graphql-types/objects/message-connection.mode';
import { PaginationArgs } from 'src/shared/graphql/graphql-types/args/pagination.args';
import { Message } from './graphql-types/objects/message.model';
import { CreateMessageInput } from './graphql-types/inputs/create-message.input';
import { CreateMessageUseCase } from './usecases/create-message.usecase';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class MessageResolver {
  constructor(
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly listMessagesByRoomUseCase: ListMessagesByRoomUseCase,
  ) {}

  @Query(() => MessageConnection)
  async messagesConnectionByRoom(
    @Args('roomId', { type: () => ID }) roomId: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<MessageConnection> {
    const { first, after, last, before } = paginationArgs;
    return this.listMessagesByRoomUseCase.execute(
      roomId,
      first,
      after,
      last,
      before,
    );
  }

  @Mutation(() => Message)
  async createMessage(@Args('input') input: CreateMessageInput) {
    const message = this.createMessageUseCase.execute(input);
    this.pubSub.publish('messageAdded', { messageAdded: message });
    return message;
  }

  @Subscription(() => Message)
  messageAdded() {
    return this.pubSub.asyncIterableIterator('messageAdded');
  }
}
