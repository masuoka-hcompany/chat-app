import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SyncUserDto } from './dtos/sync-user.dto';
import { AuthSyncUseCase } from './usecases/auth-sync.usecase';
import { AuthSyncGuard } from './guards/auth-sync.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSyncUseCase: AuthSyncUseCase) {}

  @Post('sync')
  @Public()
  @UseGuards(AuthSyncGuard)
  async sync(@Body() dto: SyncUserDto) {
    return await this.authSyncUseCase.execute(dto);
  }
}
