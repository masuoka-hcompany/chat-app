import {
  MessageItemFragmentFragment,
  MessageItemFragmentFragmentDoc,
  MessagesByRoomQuery,
} from "@/gql/graphql";
import { ChatMessageItemProps } from "../components/chat-message-item";
import { useFragment } from "@/gql/fragment-masking";

export function mapGraphQLMessagesToChatMessages(
  graphqlData: MessagesByRoomQuery
): ChatMessageItemProps[] {
  return graphqlData.messagesConnectionByRoom.edges.map((edge, index) => {
    const messageFragment = useFragment(
      MessageItemFragmentFragmentDoc,
      edge.node
    );
    return mapGraphQLMessageToChatMessage(messageFragment, index);
  });
}

export function mapGraphQLMessageToChatMessage(
  messageFragment: MessageItemFragmentFragment,
  index: number
): ChatMessageItemProps {
  const isSentByCurrentUser = index % 2 === 0;

  const senderName = messageFragment.sender?.profile?.name || "";
  const avatarFallback = senderName ? senderName.charAt(0).toUpperCase() : "";

  return {
    id: messageFragment.id,
    variant: isSentByCurrentUser ? "sent" : "received",
    avatarSrc: messageFragment.sender?.profile?.profileImageUrl || "",
    avatarFallback: avatarFallback,
    message: messageFragment.contents || "",
  };
}
