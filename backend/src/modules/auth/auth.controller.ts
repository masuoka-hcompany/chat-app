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
    return await this.authSyncUseCase.execute(dto);
  }
}
