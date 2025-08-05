import { ChatMessageItem } from "./chat-message-item";

type ChatMessageListProps = {
  messages: {
    id: number;
    variant: "sent" | "received";
    avatarSrc: string;
    avatarFallback: string;
    message: string;
  }[];
};

export function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <div className="w-full h-full space-y-8 px-40 py-16">
      {messages.map((msg) => (
        <ChatMessageItem key={msg.id} {...msg} />
      ))}
    </div>
  );
}
