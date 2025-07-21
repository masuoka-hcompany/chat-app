import { Room } from '../../graphql-types/objects/room.model';

export interface IRoomRepository {
  findById(id: string): Promise<Room | null>;
}

export const IRoomRepositoryToken = Symbol('IRoomRepository');
