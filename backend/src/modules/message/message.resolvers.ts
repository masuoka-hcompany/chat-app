import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { ListMessagesByRoomUseCase } from './usecases/list-messages-by-room.usecase';
import { MessageConnection } from './graphql-types/objects/message-connection.mode';
import { PaginationArgs } from 'src/shared/graphql/graphql-types/args/pagination.args';

@Resolver()
export class MessageResolver {
  constructor(
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
}
