import {
  MessageItemFragmentFragment,
  MessageItemFragmentFragmentDoc,
  MessagesByRoomQuery,
} from "@/gql/graphql";
import { ChatMessageItemProps } from "../components/chat-message-item";
import { useFragment } from "@/gql/fragment-masking";
import { getLoggedInUserId } from "./get-logged-in-user-id";

export function mapGraphQLMessagesToChatMessages(
  graphqlData: MessagesByRoomQuery
): ChatMessageItemProps[] {
  return graphqlData.messagesConnectionByRoom.edges.map((edge) => {
    const messageFragment = useFragment(
      MessageItemFragmentFragmentDoc,
      edge.node
    );
    return mapGraphQLMessageToChatMessage(messageFragment);
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
