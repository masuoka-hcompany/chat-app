import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IRoomRepository } from './interfaces/interface.room.repository';
import { Room } from '../graphql-types/objects/room.model';

@Injectable()
export class RoomPrismaRepository implements IRoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Room | null> {
    return await this.prisma.room.findUnique({
      where: {
        id,
      },
    });
  }
}
