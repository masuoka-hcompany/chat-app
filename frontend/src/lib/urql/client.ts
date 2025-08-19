"use client";

import {
  Client,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import { createClient as createWSClient } from "graphql-ws";

const wsClient =
  typeof window !== "undefined"
    ? createWSClient({
        url: process.env.NEXT_PUBLIC_WS_GRAPHQL_API_ENDPOINT!,
        connectionParams: () => ({}),
      })
    : null;

export const urqlClient = new Client({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (request) => {
        if (!wsClient) {
          throw new Error("WebSocket client not available");
        }

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
