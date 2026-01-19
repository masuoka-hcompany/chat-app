import { Inject, Injectable } from '@nestjs/common';
import { SyncUserDto } from '../dtos/sync-user.dto';
import {
  IUserRepository,
  IUserRepositoryToken,
} from 'src/modules/user/repositories/interfaces/interface.user.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthSyncUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(dto: SyncUserDto) {
    const userByAccount = await this.userRepository.findByAccount(
      dto.provider,
      dto.providerAccountId,
    );
    if (userByAccount) return userByAccount;

    const userByEmail = await this.userRepository.findByEmail(dto.email);
    if (userByEmail) {
      try {
        await this.userRepository.addAccountToUser(
          userByEmail.id,
          dto.provider,
          dto.providerAccountId,
        );
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2002'
        ) {
          // すでに他プロセスでアカウントが追加された場合
          return await this.userRepository.findByAccount(
            dto.provider,
            dto.providerAccountId,
          );
        }
        throw e;
      }
      return userByEmail;
    }

    try {
      return await this.userRepository.createWithAccount(dto);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        // すでに他プロセスでユーザー＋アカウントが作成された場合
        return await this.userRepository.findByAccount(
          dto.provider,
          dto.providerAccountId,
        );
      }
      throw e;
    }
  }
}
