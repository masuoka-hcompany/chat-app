import { getGraphqlClient } from "@/lib/graphql-request/client";
import { ChatMessageList } from "./chat-message-list";
import { MessagesByRoomDocument } from "@/gql/graphql";
import { mapGraphQLMessagesToChatMessages } from "../lib/message-mapper";
import { getLoggedInUserId } from "../lib/get-logged-in-user-id";

export async function ChatMessageListContainer() {
  const client = await getGraphqlClient();
  const messagesByRoomDocument = await client.request(MessagesByRoomDocument, {
    roomId: "6508a8a7-2b77-49ee-947e-f01260a1e295", // TODO: 仮実装なので、取り急ぎ決め打ちのIDを指定。後々動的に取得する。
    last: 10,
  });

  const loggedInUserId = await getLoggedInUserId();

  const messages = mapGraphQLMessagesToChatMessages(
    messagesByRoomDocument,
    loggedInUserId
  );

  const pageInfo = messagesByRoomDocument.messagesConnectionByRoom?.pageInfo;

  return <ChatMessageList messages={messages} pageInfo={pageInfo} />;
}
