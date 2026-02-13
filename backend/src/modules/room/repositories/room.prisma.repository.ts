import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IRoomRepository } from './interfaces/interface.room.repository';
import { Room } from '../graphql-types/objects/room.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoomPrismaRepository implements IRoomRepository {
  private readonly defaultInclude = Prisma.validator<Prisma.RoomInclude>()({
    creator: true,
    updater: true,
  });

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Room | null> {
    return await this.prisma.room.findUnique({
      where: {
        id,
      },
      include: this.defaultInclude,
    });
  }

  async create(
    name: string,
    description: string | undefined,
    userId: string,
  ): Promise<Room> {
    return await this.prisma.room.create({
      data: {
        name,
        description,
        createUserId: userId,
        updateUserId: userId,
      },
      include: this.defaultInclude,
    });
  }

  async addMember(roomId: string, userId: string): Promise<void> {
    try {
      await this.prisma.roomMember.create({
        data: {
          roomId,
          userId,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'User has already been invited to this room',
          );
        }
        if (error.code === 'P2003') {
          throw new NotFoundException('Room or User not found');
        }
      }
      throw error;
    }
  }

  async createInvitation(
    roomId: string,
    invitedUserId: string,
    invitedBy: string,
  ): Promise<void> {
    try {
      await this.prisma.roomMember.create({
        data: {
          roomId,
          userId: invitedUserId,
          invitedBy,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'User has already been invited to this room',
          );
        }
        if (error.code === 'P2003') {
          throw new NotFoundException('Room or User not found');
        }
      }
    }
  }
}
