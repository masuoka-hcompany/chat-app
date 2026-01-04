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
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthJsGuard } from './modules/auth/guards/auth-js.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/shared/graphql/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: any) => {
            return { connectionParams: context.connectionParams };
          },
        },
      },
      context: (ctx) => {
        const { req, res, extra, connectionParams } = ctx as any;

        if (extra || connectionParams) {
          const params =
            extra?.connectionParams ||
            connectionParams ||
            extra?.request?.headers;

          return {
            connectionParams: params,
            Authorization: params?.Authorization || params?.authorization,
          };
        }
        return { req, res };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    PubSubModule,
    RoomModule,
    UserModule,
    MessageModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthJsGuard,
    },
  ],
})
export class AppModule {}
