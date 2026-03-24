import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IRoomRepository,
  IRoomRepositoryToken,
} from '../repositories/interfaces/interface.room.repository';
import {
  IRoomMemberRepository,
  IRoomMemberRepositoryToken,
} from '../repositories/interfaces/interface.room-member.repository';
import { UserPayload } from 'src/modules/auth/types/user-payload';
import { isUUID } from 'class-validator';

@Injectable()
export class CheckUserJoinedRoomUseCase {
  constructor(
    @Inject(IRoomRepositoryToken)
    private readonly roomRepository: IRoomRepository,
    @Inject(IRoomMemberRepositoryToken)
    private readonly roomMemberRepository: IRoomMemberRepository,
  ) {}

  async execute(roomId: string, user: UserPayload): Promise<boolean> {
    if (!isUUID(roomId)) {
      throw new BadRequestException('roomId must be a valid UUID');
    }

    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    return this.roomMemberRepository.existsByRoomIdAndUserId(roomId, user.sub);
  }
}
