import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    const room = await this.roomRepository.findById(input.roomId);
    if (!room) {
      throw new NotFoundException(`Room with id ${input.roomId} not found`);
    }

    try {
      await this.roomRepository.createInvitation(
        input.roomId,
        input.userId,
        user.sub,
      );
    } catch (e) {
      if (
        !(
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2002'
        )
      ) {
        throw e;
      }
    }

    return await this.roomRepository.findById(input.roomId);
  }
}
