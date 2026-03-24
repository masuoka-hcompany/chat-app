import { UserConnection } from 'src/modules/user/graphql-types/objects/user-connection.model';
import { RoomMemberConnection } from '../../graphql-types/objects/room-member-connection.model';

export interface FetchRoomMembersConnectionParams {
  roomId: string;
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface IRoomMemberRepository {
  addMember(roomId: string, userId: string): Promise<void>;
  createInvitation(
    roomId: string,
    invitedUserId: string,
    invitedBy: string,
  ): Promise<void>;
  fetchRoomMembersConnection(
    params: FetchRoomMembersConnectionParams,
  ): Promise<RoomMemberConnection>;
  existsByRoomIdAndUserId(roomId: string, userId: string): Promise<boolean>;
  findAvailableUsersForRoom(
    roomId: string,
    first?: number,
    after?: string,
    last?: number,
    before?: string,
  ): Promise<UserConnection>;
}

export const IRoomMemberRepositoryToken = Symbol('IRoomMemberRepository');
