import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: SyncUserDto) {
    const user = await this.resolveUser(dto);
    console.log('Synchronized user:', user);
    const accessToken = this.generateToken(user);
    console.log('Generated access token for user:', accessToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.profile?.name,
        image: user.profile?.profileImageUrl,
      },
      accessToken,
    };
  }

  /**
   * ユーザー特定ロジック
   * 既存アカウント確認 -> メール紐付け -> 新規作成 の優先順位で処理
   */
  private async resolveUser(dto: SyncUserDto) {
    // a. プロバイダー情報で検索
    const existingByAccount = await this.userRepository.findByAccount(
      dto.provider,
      dto.providerAccountId,
    );
    if (existingByAccount) return existingByAccount;

    // b. メールアドレスで検索して紐付け
    const existingByEmail = await this.userRepository.findByEmail(dto.email);
    if (existingByEmail) {
      return await this.userRepository.addAccountToUser(
        existingByEmail.id,
        dto.provider,
        dto.providerAccountId,
      );
    }

    // c. いずれにも該当しない場合は新規作成
    return await this.userRepository.createWithAccount(dto);
  }

  /**
   * JWT署名ロジック
   */
  private generateToken(user: { id: string; email: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }
}
