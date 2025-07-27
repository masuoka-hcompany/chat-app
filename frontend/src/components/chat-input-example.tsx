"use client";

import {
  ChatInput,
  ChatInputSubmit,
  ChatInputTextArea,
} from "@/components/ui/chat-input";

export function ChatInputDemo() {
  return (
    <div className="w-full h-full space-y-4 px-40 py-16">
      <ChatInput variant="default">
        <ChatInputTextArea placeholder="Type a message..." />
        <ChatInputSubmit />
      </ChatInput>
    </div>
  );
}
