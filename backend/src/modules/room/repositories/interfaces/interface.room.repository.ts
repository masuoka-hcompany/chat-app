import { RoomFilterInput } from '../../graphql-types/inputs/room-filter.input';
import { RoomConnection } from '../../graphql-types/objects/room-connection.model';
import { Room } from '../../graphql-types/objects/room.model';

export interface FetchRoomsConnectionParams {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  filter?: RoomFilterInput;
  currentUserId?: string;
}

export interface IRoomRepository {
  findById(id: string): Promise<Room | null>;
  fetchRoomsConnection(
    params: FetchRoomsConnectionParams,
  ): Promise<RoomConnection>;
  create(
    name: string,
    description: string | undefined,
    userId: string,
  ): Promise<Room>;
}

export const IRoomRepositoryToken = Symbol('IRoomRepository');
