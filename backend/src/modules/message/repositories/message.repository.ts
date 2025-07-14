import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
  FetchMessagesConnectionParams,
  IMessageRepository,
} from './interfaces/interface.message.repository';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async fetchMessagesConnection(params: FetchMessagesConnectionParams) {
    const { roomId, first, after, last, before } = params;

    const totalCount = await this.prisma.message.count({
      where: { roomId },
    });

    const take = first ?? last ?? 20;
    const cursor = after ?? before;
    const cursorObj = cursor ? { id: cursor } : undefined;

    const isForward = !!first;
    const orderBy = { createdAt: 'asc' as const };

    const messages = await this.prisma.message.findMany({
      where: { roomId },
      take: isForward ? take + 1 : -(take + 1),
      skip: cursor ? 1 : 0,
      cursor: cursorObj,
      orderBy,
      include: {
        sender: {
          include: {
            profile: true,
          },
        },
      },
    });

    const hasExtra = messages.length > take;
    const sliced = hasExtra ? messages.slice(0, take) : messages;

    const edges = sliced.map((msg) => ({
      cursor: msg.id,
      node: msg,
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
}
