import { RoomMember } from '@prisma/client';
import { Room } from '../../graphql-types/objects/room.model';

export interface IRoomRepository {
  findById(id: string): Promise<Room | null>;
  create(name: string, description: string, userId: string): Promise<Room>;
  addMember(roomId: string, userId: string): Promise<RoomMember>;
  createInvitation(
    roomId: string,
    invitedUserId: string,
    invitedBy: string,
  ): Promise<RoomMember>;
}

export const IRoomRepositoryToken = Symbol('IRoomRepository');
