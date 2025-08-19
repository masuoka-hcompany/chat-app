"use server";

import { graphqlRequestClient } from "@/lib/graphql-request/client";
import { CreateMessageDocument } from "@/gql/graphql";
import { getLoggedInUserId } from "../lib/get-logged-in-user-id";

export async function sendMessageAction(
  message: string
): Promise<{ ok: boolean; message?: string; error?: string }> {
  try {
    await graphqlRequestClient.request(CreateMessageDocument, {
      input: {
        contents: message,
        roomId: "6508a8a7-2b77-49ee-947e-f01260a1e295", // TODO: 仮実装なので、取り急ぎ決め打ちのIDを指定。後々動的に取得する。
        senderId: getLoggedInUserId(),
      },
    });
    return { ok: true, message: `送信に成功しました: ${message}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "送信失敗" };
  }
}
