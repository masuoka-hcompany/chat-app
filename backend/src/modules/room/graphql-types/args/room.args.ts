import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class RoomArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
