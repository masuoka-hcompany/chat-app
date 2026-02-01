import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IRoomRepository } from './interfaces/interface.room.repository';
import { Room } from '../graphql-types/objects/room.model';
import { RoomMember } from '@prisma/client';

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

  async create(
    name: string,
    description: string,
    userId: string,
  ): Promise<Room> {
    return await this.prisma.room.create({
      data: {
        name,
        description,
        createUserId: userId,
        updateUserId: userId,
      },
    });
  }

  async addMember(roomId: string, userId: string): Promise<RoomMember> {
    try {
      return await this.prisma.roomMember.create({
        data: {
          roomId,
          userId,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Already a member of this room');
      }
      throw error;
    }
  }

  async createInvitation(
    roomId: string,
    invitedUserId: string,
    invitedBy: string,
  ): Promise<RoomMember> {
    return await this.prisma.roomMember.create({
      data: {
        roomId,
        userId: invitedUserId,
        invitedBy,
      },
    });
  }
}
