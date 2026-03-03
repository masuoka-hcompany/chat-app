import { getGraphqlClient } from "@/lib/graphql-request/client";
import { RoomsConnectionDocument } from "@/gql/graphql";
import { AvailableRoomListContainer } from "./available-room-list-container";
import { JoinedRoomList, JoinedRoomListProps } from "./joined-room-list";

export async function JoinedRoomListContainer({ roomId }: { roomId?: string }) {
  const client = await getGraphqlClient();
  const roomsConnectionDocument = await client.request(
    RoomsConnectionDocument,
    {
      filter: {
        joinedByMe: true,
      },
    },
  );

  const rooms: JoinedRoomListProps["rooms"] =
    roomsConnectionDocument.roomsConnection.edges.map((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
      isActive: edge.node.id === roomId,
    }));

  return (
    <>
      <JoinedRoomList rooms={rooms} />
      <AvailableRoomListContainer />
    </>
  );
}
