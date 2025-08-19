"use client";

import { useState } from "react";
import { useClient } from "urql";
import { ChatMessageItem, ChatMessageItemProps } from "./chat-message-item";
import { MessagesByRoomDocument, PageInfo } from "@/gql/graphql";
import { mapGraphQLMessagesToChatMessages } from "../lib/message-mapper";
import { useRealtimeMessages } from "../hooks/use-realtime-messages";

type ChatMessageListProps = {
  messages: ChatMessageItemProps[];
  pageInfo: PageInfo;
};

export function ChatMessageList({ messages, pageInfo }: ChatMessageListProps) {
  const [allMessages, setAllMessages] = useRealtimeMessages(messages);
  const [hasMore, setHasMore] = useState(pageInfo.hasPreviousPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const client = useClient();

  const loadPreviousMessages = async () => {
    setIsLoadingMore(true);
    const beforeCursor = allMessages.length > 0 ? allMessages[0].id : undefined;
    const result = await client
      .query(MessagesByRoomDocument, {
        roomId: "6508a8a7-2b77-49ee-947e-f01260a1e295", // TODO: 仮実装なので、取り急ぎ決め打ちのIDを指定。後々動的に取得する。
        last: 5,
        before: beforeCursor,
      })
      .toPromise();

    await new Promise((resolve) => setTimeout(resolve, 200)); // 取得速度が早すぎるので、あえて少し遅延させる。

    if (result.data?.messagesConnectionByRoom?.edges) {
      const newMessages = mapGraphQLMessagesToChatMessages(result.data);
      setAllMessages((prev) => [...newMessages, ...prev]);

      const pageInfo = result.data?.messagesConnectionByRoom?.pageInfo;
      setHasMore(pageInfo.hasPreviousPage ?? false);
    }
    setIsLoadingMore(false);
  };

  return (
    <div className="w-full h-full space-y-8 px-4 py-4 sm:px-12 sm:py-8 md:px-24 md:py-12 lg:px-40 lg:py-16">
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
