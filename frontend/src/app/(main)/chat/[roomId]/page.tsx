import { isValidUUID } from "@/lib/validation";
import { ChatMessageListContainer } from "../components/chat-message-list-container";
import { ChatRoomHeaderContainer } from "../components/chat-room-header-container";
import { ChatRoomInputOrJoinContainer } from "../components/chat-room-input-or-join-container";

export default async function ChatRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const { roomId } = await params;

  if (!isValidUUID(roomId)) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  return (
    <>
      <ChatRoomHeaderContainer roomId={roomId} />
      <ChatMessageListContainer roomId={roomId} />
      <ChatRoomInputOrJoinContainer roomId={roomId} />
    </>
  );
}
