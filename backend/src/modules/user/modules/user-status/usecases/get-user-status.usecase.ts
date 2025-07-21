import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUserStatusRepository,
  IUserStatusRepositoryToken,
} from '../repositories/interfaces/interface.user-status.repository';
import { UserStatus } from '../graphql-types/user-status.model';

@Injectable()
export class GetUserStatusUseCase {
  constructor(
    @Inject(IUserStatusRepositoryToken)
    private readonly userStatusRepository: IUserStatusRepository,
  ) {}

  async execute(id: string): Promise<UserStatus | null> {
    const userStatus = await this.userStatusRepository.findById(id);
    if (!userStatus) {
      throw new NotFoundException('userStatus not found');
    }
    return userStatus;
  }
}
