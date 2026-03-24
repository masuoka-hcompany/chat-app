import { RoomDocument } from "@/gql/graphql";
import { getGraphqlClient } from "@/lib/graphql-request/client";
import { RoomJoinPrompt } from "./room-join-prompt";

export async function RoomJoinPromptContainer({ roomId }: { roomId: string }) {
  const client = await getGraphqlClient();
  const roomDocument = await client.request(RoomDocument, {
    roomId,
  });

  if (!roomDocument?.room?.name) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const title = roomDocument?.room?.name ?? "不明なルーム";
  return <RoomJoinPrompt roomName={title} roomId={roomId} />;
}
