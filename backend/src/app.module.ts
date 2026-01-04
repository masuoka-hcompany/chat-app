import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './shared/prisma/prisma.module';
import { PubSubModule } from './shared/pubsub/pubsub.module';
import { RoomModule } from './modules/room/room.module';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/shared/graphql/schema.gql'),
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    PrismaModule,
    PubSubModule,
    RoomModule,
    UserModule,
    MessageModule,
    AuthModule,
  ],
})
export class AppModule {}
