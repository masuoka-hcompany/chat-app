"use server";

import { getGraphqlClient } from "@/lib/graphql-request/client";
import { JoinRoomDocument } from "@/gql/graphql";
import { getLoggedInUserId } from "../lib/get-logged-in-user-id";

export async function joinRoomAction(
  roomId: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const client = await getGraphqlClient();
    const loggedInUserId = await getLoggedInUserId();

    if (!loggedInUserId) {
      return { ok: false, error: "ログインユーザーIDが取得できませんでした。" };
    }

    await client.request(JoinRoomDocument, {
      input: {
        roomId: roomId,
      },
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "参加失敗" };
  }
}
