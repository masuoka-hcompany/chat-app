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
        url: "ws://localhost:3200/graphql", // TODO: envから取得
        connectionParams: () => ({}),
      })
    : null;

export const urqlClient = new Client({
  url: "http://localhost:3200/graphql", // TODO: envから取得
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
