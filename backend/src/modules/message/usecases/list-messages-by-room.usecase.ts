import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageRepository,
  IMessageRepositoryToken,
} from '../repositories/interfaces/interface.message.repository';
import { MessageConnection } from '../graphql-types/objects/message-connection.mode';

@Injectable()
export class ListMessagesByRoomUseCase {
  constructor(
    @Inject(IMessageRepositoryToken)
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(
    roomId: string,
    first?: number,
    after?: string,
    last?: number,
    before?: string,
  ): Promise<MessageConnection> {
    const result = await this.messageRepository.fetchMessagesConnection({
      roomId,
      first,
      after,
      last,
      before,
    });

    return {
      edges: result.edges,
      pageInfo: result.pageInfo,
      totalCount: result.totalCount,
    };
  }
}
