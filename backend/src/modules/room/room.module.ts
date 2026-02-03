import { Module } from '@nestjs/common';
import { IRoomRepositoryToken } from './repositories/interfaces/interface.room.repository';
import { RoomPrismaRepository } from './repositories/room.prisma.repository';
import { RoomResolver } from './room.resolvers';
import { GetRoomUseCase } from './usecases/get-room.usecase';
import { UserModule } from '../user/user.module';
import { CreateRoomUseCase } from './usecases/create-room.usecase';
import { JoinRoomUseCase } from './usecases/join-room.usecase';
import { InviteUserToRoomUseCase } from './usecases/invite-user-to-room.usecase';

@Module({
  imports: [UserModule],
  providers: [
    RoomResolver,
    GetRoomUseCase,
    CreateRoomUseCase,
    JoinRoomUseCase,
    InviteUserToRoomUseCase,
    {
      provide: IRoomRepositoryToken,
      useClass: RoomPrismaRepository,
    },
  ],
})
export class RoomModule {}
