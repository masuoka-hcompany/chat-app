import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { Room } from '../graphql-types/objects/room.model';
import { CreateRoomInput } from '../graphql-types/inputs/create-room.input';

@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(input: CreateRoomInput, userId: string): Promise<Room> {
    return await this.roomRepository.create(
      input.name,
      input.description,
      userId,
    );
  }
}
