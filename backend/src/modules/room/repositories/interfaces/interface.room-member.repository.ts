export interface IRoomMemberRepository {
  addMember(roomId: string, userId: string): Promise<void>;
  createInvitation(
    roomId: string,
    invitedUserId: string,
    invitedBy: string,
  ): Promise<void>;
}

export const IRoomMemberRepositoryToken = Symbol('IRoomMemberRepository');
