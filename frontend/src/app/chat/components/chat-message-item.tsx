import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";

export type ChatMessageItemProps = {
  id: string;
  variant: "sent" | "received";
  avatarSrc: string;
  avatarFallback: string;
  message: string;
};

export function ChatMessageItem({
  variant,
  avatarSrc,
  avatarFallback,
  message,
}: ChatMessageItemProps) {
  return (
    <ChatBubble variant={variant}>
      <ChatBubbleAvatar fallback={avatarFallback} src={avatarSrc} />
      <ChatBubbleMessage variant={variant === "sent" ? "sent" : undefined}>
        {message.split("\n").map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
