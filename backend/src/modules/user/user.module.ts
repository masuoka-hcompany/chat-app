import { Module } from '@nestjs/common';
import { UserStatusModule } from './modules/user-status/user-status.module';
import { GetUserUseCase } from './usecases/get-user.usecase';
import { IUserRepositoryToken } from './repositories/interfaces/interface.user.repository';
import { UserPrismaRepository } from './repositories/user.prisma.repository';

@Module({
  imports: [UserStatusModule],
  providers: [
    GetUserUseCase,
    {
      provide: IUserRepositoryToken,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [GetUserUseCase],
})
export class UserModule {}
