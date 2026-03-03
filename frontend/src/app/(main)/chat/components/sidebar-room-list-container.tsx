import { getGraphqlClient } from "@/lib/graphql-request/client";
import { RoomsConnectionDocument } from "@/gql/graphql";
import { SidebarRoomList, SidebarRoomListProps } from "./sidebar-room-list";

export async function SidebarRoomListContainer({
  roomId,
}: {
  roomId?: string;
}) {
  const client = await getGraphqlClient();
  const roomsConnectionDocument = await client.request(
    RoomsConnectionDocument,
    {
      filter: {
        joinedByMe: true,
      },
    },
  );

  const rooms: SidebarRoomListProps["rooms"] =
    roomsConnectionDocument.roomsConnection.edges.map((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
      isActive: edge.node.id === roomId,
    }));

  return <SidebarRoomList rooms={rooms} />;
}
