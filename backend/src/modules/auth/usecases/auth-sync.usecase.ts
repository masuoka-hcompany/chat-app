import { Inject, Injectable } from '@nestjs/common';
import { SyncUserDto } from '../dto/sync-user.dto';
import {
  IUserRepository,
  IUserRepositoryToken,
} from 'src/modules/user/repositories/interfaces/interface.user.repository';

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
      await this.userRepository.addAccountToUser(
        userByEmail.id,
        dto.provider,
        dto.providerAccountId,
      );
      return userByEmail;
    }

    return await this.userRepository.createWithAccount(dto);
  }
}
