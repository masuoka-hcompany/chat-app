"use server";

import { getGraphqlClient } from "@/lib/graphql-request/client";
import { getLoggedInUserId } from "../lib/get-logged-in-user-id";
import { InviteUserToRoomDocument } from "@/gql/graphql";

export async function InviteMemberAction(
  roomId: string,
  userId: string,
): Promise<{ ok: boolean; roomId?: string; error?: string }> {
  try {
    const client = await getGraphqlClient();
    const loggedInUserId = await getLoggedInUserId();

    if (!loggedInUserId) {
      return { ok: false, error: "ログインユーザーIDが取得できませんでした。" };
    }

    await client.request(InviteUserToRoomDocument, {
      input: {
        roomId: roomId,
        userId: userId,
      },
    });
    return { ok: true, roomId: `招待に成功しました: ${roomId}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "招待失敗" };
  }
}
