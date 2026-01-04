import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SyncUserDto } from './dto/sync-user.dto';
import { AuthSyncUseCase } from './usecases/auth-sync.usecase';
import { AuthSyncGuard } from './guard/auth-sync.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSyncUseCase: AuthSyncUseCase) {}

  @Post('sync')
  @UseGuards(AuthSyncGuard)
  async sync(@Body() dto: SyncUserDto) {
    const user = await this.authSyncUseCase.execute(dto);
    return {
      id: user.id,
      email: user.email,
      name: user.profile?.name,
      image: user.profile?.profileImageUrl,
    };
  }
}
