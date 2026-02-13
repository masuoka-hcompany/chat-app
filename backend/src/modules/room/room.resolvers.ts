import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Room } from './graphql-types/objects/room.model';
import { GetRoomUseCase } from './usecases/get-room.usecase';
import { GetUserUseCase } from '../user/usecases/get-user.usecase';
import { RoomArgs } from './graphql-types/args/room.args';
import { CreateRoomInput } from './graphql-types/inputs/create-room.input';
import { CreateRoomUseCase } from './usecases/create-room.usecase';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserPayload } from '../auth/types/user-payload';
import { JoinRoomInput } from './graphql-types/inputs/join-room.input';
import { JoinRoomUseCase } from './usecases/join-room.usecase';
import { InviteUserToRoomInput } from './graphql-types/inputs/invite-user-to-room.input';
import { InviteUserToRoomUseCase } from './usecases/invite-user-to-room.usecase';
import { RoomConnection } from './graphql-types/objects/room-connection.model';
import { PaginationArgs } from 'src/shared/graphql/graphql-types/args/pagination.args';
import { ListRoomUseCase } from './usecases/list-room.usecase';
import { RoomFilterInput } from './graphql-types/inputs/room-filter.input';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly getRoomUseCase: GetRoomUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly joinRoomUseCase: JoinRoomUseCase,
    private readonly inviteUserToRoomUseCase: InviteUserToRoomUseCase,
    private readonly listRoomUseCase: ListRoomUseCase,
  ) {}

  @Query(() => Room, { nullable: true })
  async room(@Args() args: RoomArgs) {
    return this.getRoomUseCase.execute(args.id);
  }

  @Query(() => RoomConnection)
  async roomsConnection(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: UserPayload,
    @Args('filter', { type: () => RoomFilterInput, nullable: true })
    filter?: RoomFilterInput,
  ): Promise<RoomConnection> {
    const { first, after, last, before } = paginationArgs;
    return this.listRoomUseCase.execute(
      first,
      after,
      last,
      before,
      filter,
      user?.sub,
    );
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

  @Mutation(() => Room)
  async createRoom(
    @Args('input') input: CreateRoomInput,
    @CurrentUser() user: UserPayload,
  ) {
    return this.createRoomUseCase.execute(input, user);
  }

  @Mutation(() => Room)
  async joinRoom(
    @Args('input') input: JoinRoomInput,
    @CurrentUser() user: UserPayload,
  ) {
    return this.joinRoomUseCase.execute(input, user);
  }

  @Mutation(() => Room)
  async inviteUserToRoom(
    @Args('input') input: InviteUserToRoomInput,
    @CurrentUser() user: UserPayload,
  ) {
    return this.inviteUserToRoomUseCase.execute(input, user);
  }
}
