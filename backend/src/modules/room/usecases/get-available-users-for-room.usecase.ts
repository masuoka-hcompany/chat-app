import { Injectable, Inject } from '@nestjs/common';
import { UserConnection } from 'src/modules/user/graphql-types/objects/user-connection.model';
import {
  IRoomMemberRepository,
  IRoomMemberRepositoryToken,
} from '../repositories/interfaces/interface.room-member.repository';

@Injectable()
export class GetAvailableUsersForRoomUseCase {
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
  ): Promise<UserConnection> {
    return this.roomMemberRepository.findAvailableUsersForRoom(
      roomId,
      first,
      after,
      last,
      before,
    );
  }
}
