import { graphqlRequestClient } from "@/lib/graphql-request/client";
import { ChatMessageList } from "./chat-message-list";
import {
  MessageItemFragmentFragmentDoc,
  MessagesByRoomDocument,
  MessagesByRoomQuery,
} from "@/gql/graphql";
import { ChatMessageItemProps } from "./chat-message-item";
import { useFragment } from "@/gql";

function mapGraphQLMessagesToChatMessages(
  graphqlData: MessagesByRoomQuery
): ChatMessageItemProps[] {
  return graphqlData.messagesConnectionByRoom.edges.map((edge, index) => {
    const messageFragment = useFragment(
      MessageItemFragmentFragmentDoc,
      edge.node
    );

    // メッセージの送信者を判定するロジック（実際の実装に合わせて調整してください）
    const isSentByCurrentUser = index % 2 === 0; // 仮の判定ロジック

    const senderName = messageFragment.sender?.profile?.name || "";
    const avatarFallback = senderName ? senderName.charAt(0).toUpperCase() : "";

    return {
      id: messageFragment.id,
      variant: isSentByCurrentUser ? "sent" : "received",
      avatarSrc: messageFragment.sender?.profile?.profileImageUrl || "",
      avatarFallback: avatarFallback,
      message: messageFragment.contents || "",
    };
  });
}

export async function ChatMessageListContainer() {
  const messagesByRoomDocument = await graphqlRequestClient.request(
    MessagesByRoomDocument,
    {}
  );

  const messages = mapGraphQLMessagesToChatMessages(messagesByRoomDocument);

  return <ChatMessageList messages={messages} />;
}
