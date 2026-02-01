import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { JoinRoomInput } from '../graphql-types/inputs/join-room.input';
import { RoomMember } from '@prisma/client';

@Injectable()
export class JoinRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(input: JoinRoomInput, userId: string): Promise<RoomMember> {
    return await this.roomRepository.addMember(input.roomId, userId);
  }
}
