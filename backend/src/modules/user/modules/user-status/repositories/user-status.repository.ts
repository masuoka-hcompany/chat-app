import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IUserStatusRepository } from './interfaces/interface.user-status.repository';
import { UserStatus } from '../graphql-types/user-status.model';

@Injectable()
export class UserStatusPrismaRepository implements IUserStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserStatus | null> {
    return await this.prisma.userStatus.findUnique({
      where: {
        id,
      },
    });
  }
}
