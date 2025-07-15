import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
  FetchMessagesConnectionParams,
  IMessageRepository,
} from './interfaces/interface.message.repository';
import { CreateMessageInput } from '../graphql-types/inputs/create-message.input';
import { messageIncludeSenderWithProfile } from './message.prisma.include';

@Injectable()
export class MessagePrismaRepository implements IMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateMessageInput) {
    const { roomId, senderId, contents } = input;
    return this.prisma.message.create({
      data: {
        roomId,
        senderId,
        contents,
      },
      include: messageIncludeSenderWithProfile,
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
      include: messageIncludeSenderWithProfile,
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
