import { AppHeader } from "@/components/layout/app-header";
import { ChatInputArea } from "@/app/chat/components/chat-input-area";
import { ChatMessageListContainer } from "../components/chat-message-list-container";

export default function ChatRoomPage() {
  return (
    <>
      <AppHeader pageTitle="雑談" />
      <ChatMessageListContainer />
      <ChatInputArea />
    </>
  );
}
