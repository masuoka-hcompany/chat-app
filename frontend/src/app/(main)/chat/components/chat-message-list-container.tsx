import { getGraphqlClient } from "@/lib/graphql-request/client";
import { ChatMessageList } from "./chat-message-list";
import { MessagesByRoomDocument } from "@/gql/graphql";
import { mapGraphQLMessagesToChatMessages } from "../lib/message-mapper";
import { getLoggedInUserId } from "../lib/get-logged-in-user-id";

export async function ChatMessageListContainer({ roomId }: { roomId: string }) {
  const client = await getGraphqlClient();
  const messagesByRoomDocument = await client.request(MessagesByRoomDocument, {
    roomId,
    last: 10,
  });

  const loggedInUserId = await getLoggedInUserId();

  const messages = mapGraphQLMessagesToChatMessages(
    messagesByRoomDocument,
    loggedInUserId,
  );

  const pageInfo = messagesByRoomDocument.messagesConnectionByRoom?.pageInfo;

  return (
    <ChatMessageList messages={messages} pageInfo={pageInfo} roomId={roomId} />
  );
}
