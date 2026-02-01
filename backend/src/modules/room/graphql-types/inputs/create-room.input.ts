import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @Field(() => String, { description: 'チャットルーム名' })
  @IsString()
  @MaxLength(100, {
    message: 'チャットルーム名は100文字以内で入力してください',
  })
  name: string;

  @Field(() => String, { nullable: true, description: '説明' })
  @IsString()
  @IsOptional()
  @MaxLength(500, { message: '説明は500文字以内で入力してください' })
  description?: string;
}
