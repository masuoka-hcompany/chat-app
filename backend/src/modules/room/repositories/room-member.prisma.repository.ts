import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
  FetchRoomMembersConnectionParams,
  IRoomMemberRepository,
} from './interfaces/interface.room-member.repository';
import { Prisma } from '@prisma/client';
import { RoomMemberConnection } from '../graphql-types/objects/room-member-connection.model';

@Injectable()
export class RoomMemberPrismaRepository implements IRoomMemberRepository {
  private readonly defaultInclude = Prisma.validator<Prisma.RoomInclude>()({
    creator: true,
    updater: true,
  });

  constructor(private readonly prisma: PrismaService) {}

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

  async fetchRoomMembersConnection(
    params: FetchRoomMembersConnectionParams,
  ): Promise<RoomMemberConnection> {
    const { roomId, first, after, last, before } = params;

    const totalCount = await this.prisma.roomMember.count({
      where: { roomId },
    });

    const take = first ?? last ?? 20;
    const cursor = after ?? before;
    const cursorObj = cursor ? { id: cursor } : undefined;
    const isForward = !!first;

    const orderBy = { joinedAt: 'asc' as const };

    const roomMembers = await this.prisma.roomMember.findMany({
      where: { roomId },
      take: isForward ? take + 1 : -(take + 1),
      skip: cursor ? 1 : 0,
      cursor: cursorObj,
      orderBy,
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        inviter: {
          include: {
            profile: true,
          },
        },
      },
    });

    const hasExtra = roomMembers.length > take;
    const sliced = hasExtra ? roomMembers.slice(0, take) : roomMembers;

    const edges = sliced.map((member) => ({
      node: member.user,
      cursor: member.id,
      joinedAt: member.joinedAt,
      invitedBy: member.inviter,
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage: isForward ? hasExtra : false,
        hasPreviousPage: !isForward ? hasExtra : false,
        startCursor: sliced[0]?.id ?? null,
        endCursor: sliced[sliced.length - 1]?.id ?? null,
      },
      totalCount,
    };
  }
}
