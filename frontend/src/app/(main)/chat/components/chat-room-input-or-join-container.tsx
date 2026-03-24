import { getGraphqlClient } from "@/lib/graphql-request/client";
import { IsJoinedRoomDocument } from "@/gql/graphql";
import { ChatInputArea } from "./chat-input-area";
import { RoomJoinPromptContainer } from "./room-join-prompt-container";

export async function ChatRoomInputOrJoinContainer({
  roomId,
}: {
  roomId: string;
}) {
  const client = await getGraphqlClient();
  const result = await client.request(IsJoinedRoomDocument, { roomId });
  const isJoined = result?.isJoinedRoom;

  if (isJoined) {
    return <ChatInputArea roomId={roomId} />;
  } else {
    return <RoomJoinPromptContainer roomId={roomId} />;
  }
}
