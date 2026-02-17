import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { InviteUserToRoomInput } from '../graphql-types/inputs/invite-user-to-room.input';
import { UserPayload } from 'src/modules/auth/types/user-payload';
import { Room } from '../graphql-types/objects/room.model';
import {
  IRoomMemberRepository,
  IRoomMemberRepositoryToken,
} from '../repositories/interfaces/interface.room-member.repository';

@Injectable()
export class InviteUserToRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
    @Inject(IRoomMemberRepositoryToken)
    private readonly roomMemberRepository: IRoomMemberRepository,
  ) {}

  async execute(
    input: InviteUserToRoomInput,
    user: UserPayload,
  ): Promise<Room> {
    const room = await this.roomRepository.findById(input.roomId);
    if (!room) {
      throw new NotFoundException(`Room with id ${input.roomId} not found`);
    }

    await this.roomMemberRepository.createInvitation(
      input.roomId,
      input.userId,
      user.sub,
    );

    const updatedRoom = await this.roomRepository.findById(input.roomId);
    if (!updatedRoom) {
      throw new NotFoundException(
        `Room with id ${input.roomId} was deleted during operation`,
      );
    }
    return updatedRoom;
  }
}
