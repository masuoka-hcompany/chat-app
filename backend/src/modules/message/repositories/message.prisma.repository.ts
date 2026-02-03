import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
  FetchMessagesConnectionParams,
  IMessageRepository,
} from './interfaces/interface.message.repository';
import { CreateMessageInput } from '../graphql-types/inputs/create-message.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessagePrismaRepository implements IMessageRepository {
  private readonly defaultInclude = Prisma.validator<Prisma.MessageInclude>()({
    sender: {
      include: {
        userStatus: true,
        profile: true,
      },
    },
    messageType: true, // これを追加
  });

  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateMessageInput) {
    const { roomId, senderId, contents } = input;
    return this.prisma.message.create({
      data: {
        roomId,
        senderId,
        contents,
      },
      include: this.defaultInclude,
    });
  }

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
      include: this.defaultInclude,
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
