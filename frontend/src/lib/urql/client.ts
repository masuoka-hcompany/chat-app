"use client";

import {
  Client,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
  mapExchange,
} from "urql";
import { createClient as createWSClient } from "graphql-ws";

export function createUrqlClient(token?: string) {
  const wsClient =
    typeof window !== "undefined"
      ? createWSClient({
          url: process.env.NEXT_PUBLIC_WS_GRAPHQL_API_ENDPOINT!,
          connectionParams: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        })
      : null;

  return new Client({
    url: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
    exchanges: [
      cacheExchange,
      mapExchange({
        onOperation: (operation) => {
          const rawFetchOptions = operation.context.fetchOptions;
          const fetchOptions: RequestInit =
            typeof rawFetchOptions === "function"
              ? rawFetchOptions()
              : (rawFetchOptions ?? {});
          return {
            ...operation,
            context: {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...(typeof fetchOptions.headers === "object" &&
                  fetchOptions.headers !== null
                    ? fetchOptions.headers
                    : {}),
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
}
