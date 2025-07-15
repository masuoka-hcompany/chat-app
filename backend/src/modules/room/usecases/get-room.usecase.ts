import { Inject, Injectable } from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import { Room } from '../graphql-types/objects/room.model';

@Injectable()
export class GetRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(id: string): Promise<Room | null> {
    return await this.roomRepository.findById(id);
  }
}
