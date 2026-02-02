import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { InviteUserToRoomInput } from '../graphql-types/inputs/invite-user-to-room.input';
import { UserPayload } from 'src/modules/auth/types/user-payload';
import { Room } from '../graphql-types/objects/room.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class InviteUserToRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(
    input: InviteUserToRoomInput,
    user: UserPayload,
  ): Promise<Room> {
    try {
      await this.roomRepository.createInvitation(
        input.roomId,
        input.userId,
        user.sub,
      );
      return await this.roomRepository.findById(input.roomId);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return await this.roomRepository.findById(input.roomId);
      }
      throw new Error(
        `Failed to invite user to room: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }
}
