import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
  FetchRoomsConnectionParams,
  IRoomRepository,
} from './interfaces/interface.room.repository';
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

  async fetchRoomsConnection(params: FetchRoomsConnectionParams) {
    const { first, after, last, before, filter, currentUserId } = params;

    const where: any = {};
    if (filter?.joinedByMe !== undefined && currentUserId) {
      if (filter.joinedByMe === true) {
        where.roomMembers = {
          some: {
            userId: currentUserId,
          },
        };
      } else {
        where.roomMembers = {
          none: {
            userId: currentUserId,
          },
        };
      }
    }

    const totalCount = await this.prisma.room.count({ where });

    const take = first ?? last ?? 20;
    const cursor = after ?? before;
    const cursorObj = cursor ? { id: cursor } : undefined;

    const isForward = !!first;
    const orderBy = { createdAt: 'desc' as const };

    const rooms = await this.prisma.room.findMany({
      where,
      take: isForward ? take + 1 : -(take + 1),
      skip: cursor ? 1 : 0,
      cursor: cursorObj,
      orderBy,
      include: this.defaultInclude,
    });

    const hasExtra = rooms.length > take;
    const sliced = hasExtra ? rooms.slice(0, take) : rooms;

    const edges = sliced.map((room) => ({
      cursor: room.id,
      node: room,
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage: isForward ? hasExtra : false,
        hasPreviousPage: !isForward ? hasExtra : false,
        startCursor: sliced[0]?.id,
        endCursor: sliced[sliced.length - 1]?.id,
      },
      totalCount,
    };
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
}
