import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { renderWithLineBreaks } from "@/lib/render-with-line-breaks";

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
        {renderWithLineBreaks(message)}
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
