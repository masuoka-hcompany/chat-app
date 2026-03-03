import { isValidUUID } from "@/lib/validation";
import { ChatInputArea } from "../components/chat-input-area";
import { ChatMessageListContainer } from "../components/chat-message-list-container";
import { ChatRoomHeaderContainer } from "../components/chat-room-header-container";

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
      <ChatInputArea />
    </>
  );
}
