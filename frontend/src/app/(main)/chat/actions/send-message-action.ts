"use server";

import { getGraphqlClient } from "@/lib/graphql-request/client";
import { CreateMessageDocument } from "@/gql/graphql";
import { getLoggedInUserId } from "../lib/get-logged-in-user-id";

export async function sendMessageAction(
  message: string,
  roomId: string,
): Promise<{ ok: boolean; message?: string; error?: string }> {
  try {
    const client = await getGraphqlClient();
    const loggedInUserId = await getLoggedInUserId();

    if (!loggedInUserId) {
      return { ok: false, error: "ログインユーザーIDが取得できませんでした。" };
    }

    await client.request(CreateMessageDocument, {
      input: {
        contents: message,
        roomId: roomId,
        senderId: loggedInUserId,
      },
    });
    return { ok: true, message: `送信に成功しました: ${message}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "送信失敗" };
  }
}
