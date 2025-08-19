import { useEffect, useState } from "react";
import { useSubscription } from "urql";
import { ChatMessageItemProps } from "../components/chat-message-item";
import {
  MessageAddedDocument,
  MessageAddedSubscription,
  MessageItemFragmentFragmentDoc,
} from "@/gql/graphql";
import { mapGraphQLMessageToChatMessage } from "../lib/message-mapper";

/**
 * チャットメッセージのリアルタイム受信を管理するカスタムフック
 */
export function useRealtimeMessages(messages: ChatMessageItemProps[]) {
  const [allMessages, setAllMessages] = useState(messages);

  useSubscription(
    { query: MessageAddedDocument },
    (
      prev: MessageAddedSubscription | undefined,
      newMessage: MessageAddedSubscription
    ) => {
      if (!newMessage?.messageAdded)
        return prev ?? ({} as MessageAddedSubscription);

      const message = mapGraphQLMessageToChatMessage(newMessage.messageAdded);

      setAllMessages((old) =>
        old.some((m) => m.id === message.id) ? old : [...old, message]
      );
      return newMessage;
    }
  );

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  return [allMessages, setAllMessages] as const;
}
