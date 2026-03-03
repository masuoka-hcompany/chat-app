import { getGraphqlClient } from "@/lib/graphql-request/client";
import { RoomsConnectionDocument } from "@/gql/graphql";
import {
  AvailableRoomList,
  AvailableRoomListProps,
} from "./available-room-list";

export async function AvailableRoomListContainer() {
  const client = await getGraphqlClient();
  const roomsConnectionDocument = await client.request(
    RoomsConnectionDocument,
    {
      filter: {
        joinedByMe: false,
      },
    },
  );

  const rooms: AvailableRoomListProps["rooms"] =
    roomsConnectionDocument.roomsConnection.edges.map((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
    }));

  return <AvailableRoomList rooms={rooms} />;
}
