import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthSyncGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // 1. ヘッダーから Authorization を取得
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // 2. "Bearer <secret>" 形式からシークレット部分を抽出
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    // 3. 環境変数のシークレットと比較
    const internalSecret = this.configService.get<string>('AUTH_SYNC_SECRET');

    if (token !== internalSecret) {
      throw new UnauthorizedException('Invalid internal secret');
    }

    return true;
  }
}
