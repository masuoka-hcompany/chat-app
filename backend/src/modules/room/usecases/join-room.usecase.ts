import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { JoinRoomInput } from '../graphql-types/inputs/join-room.input';
import { UserPayload } from 'src/modules/auth/types/user-payload';
import { Room } from '../graphql-types/objects/room.model';

@Injectable()
export class JoinRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(input: JoinRoomInput, user: UserPayload): Promise<Room> {
    const room = await this.roomRepository.findById(input.roomId);
    if (!room) {
      throw new NotFoundException(`Room with id ${input.roomId} not found`);
    }

    await this.roomRepository.addMember(input.roomId, user.sub);

    const updatedRoom = await this.roomRepository.findById(input.roomId);
    if (!updatedRoom) {
      throw new NotFoundException(`Room with id ${input.roomId} not found`);
    }
    return updatedRoom;
  }
}
