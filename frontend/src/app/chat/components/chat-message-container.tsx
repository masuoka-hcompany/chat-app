import { ChatMessageList } from "./chat-message-list";

export function ChatMessageContainer() {
  // ダミーデータ
  const messages = [
    {
      id: 1,
      variant: "sent" as const,
      avatarSrc: "https://ui.shadcn.com/avatars/01.png",
      avatarFallback: "US",
      message: "I have a question about the library.",
    },
    {
      id: 2,
      variant: "received" as const,
      avatarSrc: "https://ui.shadcn.com/avatars/02.png",
      avatarFallback: "AI",
      message: "Sure, I'd be happy to help!",
    },
  ];

  return <ChatMessageList messages={messages} />;
}
