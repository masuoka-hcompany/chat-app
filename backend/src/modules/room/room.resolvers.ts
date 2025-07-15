import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Room } from './graphql-types/objects/room.model';
import { GetRoomUseCase } from './usecases/get-room.usecase';
import { GetUserUseCase } from '../user/usecases/get-user.usecase';
import { RoomArgs } from './graphql-types/args/room.args';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly getRoomUseCase: GetRoomUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Query(() => Room, { nullable: true })
  async room(@Args() args: RoomArgs) {
    return this.getRoomUseCase.execute(args.id);
  }

  @ResolveField()
  async creator(@Parent() room: Room) {
    const { createUserId } = room;
    return this.getUserUseCase.execute(createUserId);
  }

  @ResolveField()
  async updater(@Parent() room: Room) {
    const { updateUserId } = room;
    return this.getUserUseCase.execute(updateUserId);
  }
}
