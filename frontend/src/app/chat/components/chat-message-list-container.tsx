import { graphqlRequestClient } from "@/lib/graphql-request/client";
import { ChatMessageList } from "./chat-message-list";
import {
  MessageConnectionPageInfoFragmentFragmentDoc,
  MessagesByRoomDocument,
} from "@/gql/graphql";
import { mapGraphQLMessagesToChatMessages } from "../lib/message-mapper";
import { useFragment } from "@/gql/fragment-masking";

export async function ChatMessageListContainer() {
  const messagesByRoomDocument = await graphqlRequestClient.request(
    MessagesByRoomDocument,
    {
      roomId: "6508a8a7-2b77-49ee-947e-f01260a1e295",
      last: 10,
    }
  );

  const messages = mapGraphQLMessagesToChatMessages(messagesByRoomDocument);

  console.log(messagesByRoomDocument);

  // まだうまくいっていない
  // const messageFragment = useFragment(
  //   MessageConnectionPageInfoFragmentFragmentDoc,
  //   messagesByRoomDocument.messagesConnectionByRoom.pageInfo
  // );

  return <ChatMessageList messages={messages} />;
}
