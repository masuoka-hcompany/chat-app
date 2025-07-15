import { CreateMessageInput } from '../../graphql-types/inputs/create-message.input';
import { MessageConnection } from '../../graphql-types/objects/message-connection.mode';
import { Message } from '../../graphql-types/objects/message.model';

export interface FetchMessagesConnectionParams {
  roomId: string;
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface IMessageRepository {
  create(input: CreateMessageInput): Promise<Message>;
  fetchMessagesConnection(
    params: FetchMessagesConnectionParams,
  ): Promise<MessageConnection>;
}

export const IMessageRepositoryToken = Symbol('IMessageRepository');
