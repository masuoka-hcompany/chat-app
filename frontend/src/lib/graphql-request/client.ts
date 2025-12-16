import { GraphQLClient } from "graphql-request";

export const graphqlRequestClient = new GraphQLClient(
  process.env.GRAPHQL_API_ENDPOINT!,
  {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_API_TOKEN}`,
    },
  }
);
