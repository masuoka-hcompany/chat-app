"use client";

import { useEffect, useState } from "react";
import { useSubscription } from "urql";
import { ChatMessageItem, ChatMessageItemProps } from "./chat-message-item";
import {
  MessageAddedDocument,
  MessageAddedSubscription,
  MessageItemFragmentFragmentDoc,
} from "@/gql/graphql";
import { useFragment } from "@/gql";

type ChatMessageListProps = {
  messages: ChatMessageItemProps[];
};

export function ChatMessageList({ messages }: ChatMessageListProps) {
  const [allMessages, setAllMessages] = useState(messages);

  useSubscription(
    { query: MessageAddedDocument },
    (
      prev: MessageAddedSubscription | undefined,
      newMsg: MessageAddedSubscription
    ) => {
      if (!newMsg?.messageAdded)
        return prev ?? ({} as MessageAddedSubscription);
      const fragment = newMsg.messageAdded;

      const messageFragment = useFragment(
        MessageItemFragmentFragmentDoc,
        fragment
      );

      const msg: ChatMessageItemProps = {
        id: messageFragment.id,
        variant: "received", // 必要に応じて判定
        avatarSrc: messageFragment.sender?.profile?.profileImageUrl || "",
        avatarFallback: messageFragment.sender?.profile?.name?.charAt(0) ?? "",
        message: messageFragment.contents,
      };
      setAllMessages((old) =>
        old.some((m) => m.id === msg.id) ? old : [...old, msg]
      );
      return newMsg;
    }
  );

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  return (
    <div className="w-full h-full space-y-8 px-40 py-16">
      {allMessages.map((msg) => (
        <ChatMessageItem key={msg.id} {...msg} />
      ))}
    </div>
  );
}
