import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { Room } from '../graphql-types/objects/room.model';
import { CreateRoomInput } from '../graphql-types/inputs/create-room.input';
import { UserPayload } from 'src/modules/auth/types/user-payload';
import {
  IRoomMemberRepository,
  IRoomMemberRepositoryToken,
} from '../repositories/interfaces/interface.room-member.repository';

@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
    @Inject(IRoomMemberRepositoryToken)
    private readonly roomMemberRepository: IRoomMemberRepository,
  ) {}

  async execute(input: CreateRoomInput, user: UserPayload): Promise<Room> {
    const room = await this.roomRepository.create(
      input.name,
      input.description,
      user.sub,
    );

    await this.roomMemberRepository.addMember(room.id, user.sub);

    const updatedRoom = await this.roomRepository.findById(room.id);
    if (!updatedRoom) {
      throw new NotFoundException(`Room with id ${room.id} not found`);
    }
    return updatedRoom;
  }
}
