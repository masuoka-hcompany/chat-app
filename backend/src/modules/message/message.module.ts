import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MessageResolver } from './message.resolvers';
import { ListMessagesByRoomUseCase } from './usecases/list-messages-by-room.usecase';
import { IMessageRepositoryToken } from './repositories/interfaces/interface.message.repository';
import { MessageRepository } from './repositories/message.repository';

@Module({
  imports: [UserModule],
  providers: [
    MessageResolver,
    ListMessagesByRoomUseCase,
    {
      provide: IMessageRepositoryToken,
      useClass: MessageRepository,
    },
  ],
})
export class MessageModule {}
