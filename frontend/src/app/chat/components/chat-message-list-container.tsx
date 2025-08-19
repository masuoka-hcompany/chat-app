import { graphqlRequestClient } from "@/lib/graphql-request/client";
import { ChatMessageList } from "./chat-message-list";
import { MessagesByRoomDocument } from "@/gql/graphql";
import { mapGraphQLMessagesToChatMessages } from "../lib/message-mapper";

export async function ChatMessageListContainer() {
  const messagesByRoomDocument = await graphqlRequestClient.request(
    MessagesByRoomDocument,
    {
      roomId: "6508a8a7-2b77-49ee-947e-f01260a1e295", // TODO: 仮実装なので、取り急ぎ決め打ちのIDを指定。後々動的に取得する。
      last: 10,
    }
  );

  const messages = mapGraphQLMessagesToChatMessages(messagesByRoomDocument);
  const pageInfo = messagesByRoomDocument.messagesConnectionByRoom?.pageInfo;

  return <ChatMessageList messages={messages} pageInfo={pageInfo} />;
}
