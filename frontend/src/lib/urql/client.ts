"use client";

import {
  Client,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
  mapExchange, // 追加
} from "urql";
import { createClient as createWSClient } from "graphql-ws";
import { getSession } from "next-auth/react";

const wsClient =
  typeof window !== "undefined"
    ? createWSClient({
        url: process.env.NEXT_PUBLIC_WS_GRAPHQL_API_ENDPOINT!,
        connectionParams: async () => {
          const session = await getSession();
          return {
            Authorization: session?.accessToken
              ? `Bearer ${session.accessToken}`
              : "",
          };
        },
      })
    : null;

export const urqlClient = new Client({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
  exchanges: [
    cacheExchange,
    mapExchange({
      onOperation: async (operation) => {
        const session = await getSession();
        const token = session?.accessToken;

        return {
          ...operation,
          context: {
            ...operation.context,
            fetchOptions: {
              ...(operation.context.fetchOptions as RequestInit),
              headers: {
                ...(operation.context.fetchOptions as any)?.headers,
                Authorization: token ? `Bearer ${token}` : "",
              },
            },
          },
        };
      },
    }),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (request) => {
        if (!wsClient) throw new Error("WebSocket client not available");
        const input = { ...request, query: request.query || "" };
        return {
          subscribe: (sink) => {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});
