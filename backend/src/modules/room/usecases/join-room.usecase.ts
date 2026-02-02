import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { JoinRoomInput } from '../graphql-types/inputs/join-room.input';
import { UserPayload } from 'src/modules/auth/types/user-payload';
import { Room } from '../graphql-types/objects/room.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class JoinRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(input: JoinRoomInput, user: UserPayload): Promise<Room> {
    try {
      await this.roomRepository.addMember(input.roomId, user.sub);
      return await this.roomRepository.findById(input.roomId);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return await this.roomRepository.findById(input.roomId);
      }
      throw new Error(
        `Failed to join room: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }
}
