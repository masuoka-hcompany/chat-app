import { graphqlRequestClient } from "@/lib/graphql-request/client";
import { ChatMessageList } from "./chat-message-list";
import { MessagesByRoomDocument } from "@/gql/graphql";
import { mapGraphQLMessagesToChatMessages } from "../lib/message-mapper";

export async function ChatMessageListContainer() {
  const messagesByRoomDocument = await graphqlRequestClient.request(
    MessagesByRoomDocument,
    {}
  );

  const messages = mapGraphQLMessagesToChatMessages(messagesByRoomDocument);

  return <ChatMessageList messages={messages} />;
}
