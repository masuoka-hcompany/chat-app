import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { RoomConnection } from '../graphql-types/objects/room-connection.model';
import { RoomFilterInput } from '../graphql-types/inputs/room-filter.input';

@Injectable()
export class ListRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(
    first?: number,
    after?: string,
    last?: number,
    before?: string,
    filter?: RoomFilterInput,
    currentUserId?: string,
  ): Promise<RoomConnection> {
    return await this.roomRepository.fetchRoomsConnection({
      first,
      after,
      last,
      before,
      filter,
      currentUserId,
    });
  }
}
