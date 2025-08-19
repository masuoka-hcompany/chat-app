import {
  MessageItemFragmentFragment,
  MessagesByRoomQuery,
} from "@/gql/graphql";
import { ChatMessageItemProps } from "../components/chat-message-item";
import { getLoggedInUserId } from "./get-logged-in-user-id";

export function mapGraphQLMessagesToChatMessages(
  graphqlData: MessagesByRoomQuery
): ChatMessageItemProps[] {
  return graphqlData.messagesConnectionByRoom.edges.map((edge) => {
    return mapGraphQLMessageToChatMessage(edge.node);
  });
}

export function mapGraphQLMessageToChatMessage(
  messageFragment: MessageItemFragmentFragment
): ChatMessageItemProps {
  const isSentByCurrentUser =
    messageFragment.sender?.id === getLoggedInUserId();
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
