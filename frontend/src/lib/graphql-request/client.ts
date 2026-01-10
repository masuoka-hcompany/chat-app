import { GraphQLClient } from "graphql-request";
import { auth } from "@/auth";

export const getGraphqlClient = async () => {
  const session = await auth();
  const token = session?.accessToken;

  return new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT!, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
