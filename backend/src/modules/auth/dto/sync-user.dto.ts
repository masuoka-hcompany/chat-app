import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { AuthProvider } from '../enum/auth-provider.enum';

export class SyncUserDto {
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  @IsNotEmpty({ message: 'メールアドレスは必須です' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'プロバイダー情報は必須です' })
  provider: AuthProvider;

  @IsString()
  @IsNotEmpty({ message: 'プロバイダーアカウントIDは必須です' })
  providerAccountId: string;

  @IsString()
  @IsOptional()
  name?: string | null;

  @IsUrl({}, { message: '有効なURL形式でなければなりません' })
  @IsOptional()
  image?: string | null;
}
