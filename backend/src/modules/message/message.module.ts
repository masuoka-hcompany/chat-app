import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MessageResolver } from './message.resolvers';
import { ListMessagesByRoomUseCase } from './usecases/list-messages-by-room.usecase';
import { CreateMessageUseCase } from './usecases/create-message.usecase';
import { IMessageRepositoryToken } from './repositories/interfaces/interface.message.repository';
import { MessagePrismaRepository } from './repositories/message.prisma.repository';

@Module({
  imports: [UserModule],
  providers: [
    MessageResolver,
    CreateMessageUseCase,
    ListMessagesByRoomUseCase,
    {
      provide: IMessageRepositoryToken,
      useClass: MessagePrismaRepository,
    },
  ],
})
export class MessageModule {}
