import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { RoomMember } from '@prisma/client';
import { InviteUserToRoomInput } from '../graphql-types/inputs/invite-user-to-room.input';

@Injectable()
export class InviteUserToRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(
    input: InviteUserToRoomInput,
    userId: string,
  ): Promise<RoomMember> {
    return await this.roomRepository.createInvitation(
      input.roomId,
      input.userId,
      userId,
    );
  }
}
