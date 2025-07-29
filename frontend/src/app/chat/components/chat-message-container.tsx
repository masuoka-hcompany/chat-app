import { ChatMessageList } from "./chat-message-list";

export function ChatMessageContainer() {
  // ダミーデータ
  const messages = [
    {
      id: 1,
      variant: "sent" as const,
      avatarSrc:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop",
      avatarFallback: "US",
      message: "I have a question about the library.",
    },
    {
      id: 2,
      variant: "received" as const,
      avatarSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop",
      avatarFallback: "AI",
      message: "Sure, I'd be happy to help!",
    },
  ];

  return <ChatMessageList messages={messages} />;
}
