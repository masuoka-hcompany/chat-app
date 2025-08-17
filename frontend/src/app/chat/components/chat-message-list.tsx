"use client";

import { useEffect, useRef, useState } from "react";
import { useSubscription } from "urql";
import { ChatMessageItem, ChatMessageItemProps } from "./chat-message-item";
import {
  MessageAddedDocument,
  MessageAddedSubscription,
  MessageItemFragmentFragmentDoc,
} from "@/gql/graphql";
import { useFragment } from "@/gql";
import { mapGraphQLMessageToChatMessage } from "../lib/message-mapper";

type ChatMessageListProps = {
  messages: ChatMessageItemProps[];
};

export function ChatMessageList({ messages }: ChatMessageListProps) {
  const [allMessages, setAllMessages] = useState(messages);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const loadPreviousMessages = async () => {
    setIsLoadingMore(true);
    setTimeout(() => setIsLoadingMore(false), 1000); // ダミー: 1秒後に解除
  };

  useSubscription(
    { query: MessageAddedDocument },
    (
      prev: MessageAddedSubscription | undefined,
      newMessage: MessageAddedSubscription
    ) => {
      if (!newMessage?.messageAdded)
        return prev ?? ({} as MessageAddedSubscription);

      const fragment = newMessage.messageAdded;
      const messageFragment = useFragment(
        MessageItemFragmentFragmentDoc,
        fragment
      );

      const message = mapGraphQLMessageToChatMessage(messageFragment, 0);

      setAllMessages((old) =>
        old.some((m) => m.id === message.id) ? old : [...old, message]
      );

      return newMessage;
    }
  );

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  useScrollToBottomInstant(containerRef);

  return (
    <div ref={containerRef} className="w-full h-full space-y-8 px-40 py-16">
      {hasMore && (
        <div className="w-full py-2">
          <button
            onClick={loadPreviousMessages}
            className="w-full py-2 bg-gray-100"
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "読み込み中..." : "もっと読む"}
          </button>
        </div>
      )}
      {allMessages.map((msg) => (
        <ChatMessageItem key={msg.id} {...msg} />
      ))}
    </div>
  );
}

export function useScrollToBottomInstant(
  ref: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [ref]);
}
