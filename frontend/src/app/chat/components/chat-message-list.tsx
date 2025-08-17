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
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full space-y-8 px-40 py-16">
      {allMessages.map((msg) => (
        <ChatMessageItem key={msg.id} {...msg} />
      ))}
    </div>
  );
}
