import {
  MessageItemFragmentFragment,
  MessagesByRoomQuery,
} from "@/gql/graphql";
import { ChatMessageItemProps } from "../components/chat-message-item";

export function mapGraphQLMessagesToChatMessages(
  graphqlData: MessagesByRoomQuery,
  currentUserId: string | null
): ChatMessageItemProps[] {
  return graphqlData.messagesConnectionByRoom.edges.map((edge) => {
    return mapGraphQLMessageToChatMessage(edge.node, currentUserId);
  });
}

export function mapGraphQLMessageToChatMessage(
  messageFragment: MessageItemFragmentFragment,
  currentUserId: string | null
): ChatMessageItemProps {
  const isSentByCurrentUser = messageFragment.sender?.id === currentUserId;
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
