import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MessageResolver } from './message.resolvers';
import { ListMessagesByRoomUseCase } from './usecases/list-messages-by-room.usecase';
import { IMessageRepositoryToken } from './repositories/interfaces/interface.message.repository';
import { MessageRepository } from './repositories/message.repository';
import { CreateMessageUseCase } from './usecases/create-message.usecase';

@Module({
  imports: [UserModule],
  providers: [
    MessageResolver,
    CreateMessageUseCase,
    ListMessagesByRoomUseCase,
    {
      provide: IMessageRepositoryToken,
      useClass: MessageRepository,
    },
  ],
})
export class MessageModule {}
