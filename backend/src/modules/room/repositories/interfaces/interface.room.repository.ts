import { Room } from '../../graphql-types/objects/room.model';

export interface IRoomRepository {
  findById(id: string): Promise<Room | null>;
  create(
    name: string,
    description: string | undefined,
    userId: string,
  ): Promise<Room>;
  addMember(roomId: string, userId: string): Promise<void>;
  createInvitation(
    roomId: string,
    invitedUserId: string,
    invitedBy: string,
  ): Promise<void>;
}

export const IRoomRepositoryToken = Symbol('IRoomRepository');
