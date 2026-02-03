import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { Room } from '../graphql-types/objects/room.model';
import { CreateRoomInput } from '../graphql-types/inputs/create-room.input';
import { UserPayload } from 'src/modules/auth/types/user-payload';

@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(input: CreateRoomInput, user: UserPayload): Promise<Room> {
    return await this.roomRepository.create(
      input.name,
      input.description,
      user.sub,
    );
  }
}
