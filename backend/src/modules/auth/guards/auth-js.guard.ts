import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { jwtVerify } from 'jose';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthJsGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const ctx = GqlExecutionContext.create(context);
    const gqlCtx = ctx.getContext();

    const authHeader =
      gqlCtx.req?.headers?.Authorization ||
      gqlCtx.req?.headers?.authorization ||
      gqlCtx.connectionParams?.Authorization ||
      gqlCtx.connectionParams?.authorization ||
      gqlCtx.Authorization;

    if (!authHeader) {
      throw new UnauthorizedException('認証トークンが見つかりません');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('トークン形式が不正です (Bearerが必要)');
    }

    try {
      const secret = new TextEncoder().encode(
        this.configService.get<string>('AUTH_SECRET'),
      );

      const { payload } = await jwtVerify(token, secret, {
        algorithms: ['HS256'],
      });

      if (gqlCtx.req) {
        gqlCtx.req.user = payload;
      }

      gqlCtx.user = payload;

      return true;
    } catch (error) {
      console.error('[AuthJsGuard] JWT Verification failed:', error.message);
      throw new UnauthorizedException('有効なセッションではありません');
    }
  }
}
