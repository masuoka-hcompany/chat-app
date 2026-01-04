import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IUserRepository } from './interfaces/interface.user.repository';
import { User } from '../graphql-types/objects/user.model';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        userStatus: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
        userStatusId: 'ACTIVE',
      },
      include: {
        profile: true,
        userStatus: true,
      },
    });
  }

  async findByAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        accounts: {
          some: {
            authProviderId: provider,
            providerAccountId,
          },
        },
      },
    });
  }

  async createWithAccount(data: {
    email: string;
    image?: string;
    provider: string;
    providerAccountId: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        userStatusId: 'ACTIVE',
        accounts: {
          create: {
            authProviderId: data.provider,
            providerAccountId: data.providerAccountId,
          },
        },
      },
    });
  }

  async addAccountToUser(
    userId: string,
    provider: string,
    providerAccountId: string,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        accounts: {
          create: {
            authProviderId: provider,
            providerAccountId: providerAccountId,
          },
        },
      },
    });
  }
}
