"use server";

import { getGraphqlClient } from "@/lib/graphql-request/client";
import { CreateRoomDocument } from "@/gql/graphql";
import { getLoggedInUserId } from "../lib/get-logged-in-user-id";

export async function createRoomAction(
  name: string,
  description?: string,
): Promise<{ ok: boolean; roomId?: string; error?: string }> {
  try {
    const client = await getGraphqlClient();
    const loggedInUserId = await getLoggedInUserId();

    if (!loggedInUserId) {
      return { ok: false, error: "ログインユーザーIDが取得できませんでした。" };
    }

    await client.request(CreateRoomDocument, {
      input: {
        name: name,
        description: description,
      },
    });
    return { ok: true, roomId: `作成に成功しました: ${name}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "作成失敗" };
  }
}
