import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";

export function ChatBubbleVariants() {
  return (
    <div className="w-full h-full space-y-8 px-40 py-16">
      <ChatBubble variant="sent">
        <ChatBubbleAvatar
          fallback="US"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
        />
        <ChatBubbleMessage variant="sent">
          I have a question about the library.
        </ChatBubbleMessage>
      </ChatBubble>

      <ChatBubble variant="received">
        <ChatBubbleAvatar
          fallback="AI"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
        />
        <ChatBubbleMessage>Sure, I'd be happy to help!</ChatBubbleMessage>
      </ChatBubble>
    </div>
  );
}
