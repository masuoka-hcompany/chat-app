import { MessageConnection } from '../../graphql-types/objects/message-connection.mode';

export interface FetchMessagesConnectionParams {
  roomId: string;
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface IMessageRepository {
  fetchMessagesConnection(
    params: FetchMessagesConnectionParams,
  ): Promise<MessageConnection>;
}

export const IMessageRepositoryToken = Symbol('IMessageRepository');
