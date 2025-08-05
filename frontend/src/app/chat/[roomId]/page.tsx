import { AppHeader } from "@/components/layout/app-header";
import { ChatMessageContainer } from "@/app/chat/components/chat-message-container";
import { ChatInputArea } from "@/app/chat/components/chat-input-area";

export default function ChatRoomPage() {
  return (
    <>
      <AppHeader pageTitle="雑談" />
      <ChatMessageContainer />
      <ChatInputArea />
    </>
  );
}
