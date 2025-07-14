import { Module } from '@nestjs/common';
import { GetUserStatusUseCase } from './usecases/get-user-status.usecase';
import { IUserStatusRepositoryToken } from './repositories/interfaces/interface.user-status.repository';
import { UserStatusPrismaRepository } from './repositories/user-status.repository';

@Module({
  providers: [
    GetUserStatusUseCase,
    {
      provide: IUserStatusRepositoryToken,
      useClass: UserStatusPrismaRepository,
    },
  ],
})
export class UserStatusModule {}
