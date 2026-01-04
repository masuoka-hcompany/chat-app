import { Module } from '@nestjs/common';
import { IUserRepositoryToken } from '../user/repositories/interfaces/interface.user.repository';
import { UserPrismaRepository } from '../user/repositories/user.prisma.repository';
import { AuthController } from './auth.controller';
import { AuthSyncUseCase } from './usecases/auth-sync.usecase';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('AUTH_SYNC_SECRET'),
        signOptions: {
          expiresIn: '30d',
        },
      }),
    }),
  ],
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
