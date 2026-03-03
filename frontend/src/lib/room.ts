import { RoomsConnectionDocument } from "@/gql/graphql";
import { getGraphqlClient } from "@/lib/graphql-request/client";

export async function getFirstJoinedRoomId(): Promise<string | null> {
  const client = await getGraphqlClient();
  const roomsConnectionDocument = await client.request(
    RoomsConnectionDocument,
    {
      first: 1,
      filter: {
        joinedByMe: true,
      },
    },
  );
  return roomsConnectionDocument?.roomsConnection?.edges?.[0]?.node?.id ?? null;
}
