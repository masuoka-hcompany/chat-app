import { Module } from '@nestjs/common';
import { IUserRepositoryToken } from '../user/repositories/interfaces/interface.user.repository';
import { UserPrismaRepository } from '../user/repositories/user.prisma.repository';
import { AuthController } from './auth.controller';
import { AuthSyncUseCase } from './usecases/auth-sync.usecase';

@Module({
  imports: [],
  providers: [
    AuthSyncUseCase,
    {
      provide: IUserRepositoryToken,
      useClass: UserPrismaRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
