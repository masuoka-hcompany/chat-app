import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageRepository,
  IMessageRepositoryToken,
} from '../repositories/interfaces/interface.message.repository';
import { Message } from '../graphql-types/objects/message.model';
import { CreateMessageInput } from '../graphql-types/inputs/create-message.input';

@Injectable()
export class CreateMessageUseCase {
  constructor(
    @Inject(IMessageRepositoryToken)
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(input: CreateMessageInput): Promise<Message> {
    // TODO:senderIdでのユーザーの存在確認や、roomIdでのチャットルームの存在確認を追加予定
    return await this.messageRepository.create(input);
  }
}
