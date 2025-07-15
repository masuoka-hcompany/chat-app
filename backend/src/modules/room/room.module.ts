import { Module } from '@nestjs/common';
import { IRoomRepositoryToken } from './repositories/interfaces/interface.room.repository';
import { RoomPrismaRepository } from './repositories/room.prisma.repository';
import { RoomResolver } from './room.resolvers';
import { GetRoomUseCase } from './usecases/get-room.usecase';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    RoomResolver,
    GetRoomUseCase,
    {
      provide: IRoomRepositoryToken,
      useClass: RoomPrismaRepository,
    },
  ],
})
export class RoomModule {}
