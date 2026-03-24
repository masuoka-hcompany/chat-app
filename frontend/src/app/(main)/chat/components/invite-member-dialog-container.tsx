import { getGraphqlClient } from "@/lib/graphql-request/client";
import {
  AvailableUsersForRoomDocument,
  IsJoinedRoomDocument,
} from "@/gql/graphql";
import {
  InviteMemberDialog,
  InviteMemberDialogProps,
} from "./invite-member-dialog";

export async function InviteMemberDialogContainer({
  roomId,
}: {
  roomId: string;
}) {
  const client = await getGraphqlClient();
  const result = await client.request(IsJoinedRoomDocument, { roomId });
  const isJoined = result?.isJoinedRoom;

  if (!isJoined) {
    return null;
  }

  const availableUsersForRoomDocument = await client.request(
    AvailableUsersForRoomDocument,
    { roomId },
  );

  const users: InviteMemberDialogProps["users"] =
    availableUsersForRoomDocument.availableUsersForRoom.edges
      .filter((edge) => edge.node.profile)
      .map((edge) => ({
        id: edge.node.id,
        name: edge.node.profile!.name,
        profileImageUrl: edge.node.profile!.profileImageUrl ?? "",
      }));

  return <InviteMemberDialog roomId={roomId} users={users} />;
}
