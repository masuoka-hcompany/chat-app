import { Inject, Injectable } from '@nestjs/common';
import { RoomMemberConnection } from '../graphql-types/objects/room-member-connection.model';
import {
  IRoomMemberRepository,
  IRoomMemberRepositoryToken,
} from '../repositories/interfaces/interface.room-member.repository';

@Injectable()
export class ListRoomMembersByRoomUseCase {
  constructor(
    @Inject(IRoomMemberRepositoryToken)
    private readonly roomMemberRepository: IRoomMemberRepository,
  ) {}

  async execute(
    roomId: string,
    first?: number,
    after?: string,
    last?: number,
    before?: string,
  ): Promise<RoomMemberConnection> {
    const result = await this.roomMemberRepository.fetchRoomMembersConnection({
      roomId,
      first,
      after,
      last,
      before,
    });

    return {
      edges: result.edges,
      pageInfo: result.pageInfo,
      totalCount: result.totalCount,
    };
  }
}
