"use server";

import { ok, err, Result } from "neverthrow";
import { graphqlRequestClient } from "@/lib/graphql-request/client";
import { CreateMessageDocument } from "@/gql/graphql";

export async function sendMessageAction(
  message: string
): Promise<{ ok: boolean; message?: string; error?: string }> {
  try {
    await graphqlRequestClient.request(CreateMessageDocument, {
      input: {
        contents: message,
        roomId: "6508a8a7-2b77-49ee-947e-f01260a1e295",
        senderId: "b6e2b5e2-3c4a-4e1a-9c2a-123456789abc",
      },
    });
    return { ok: true, message: `送信に成功しました: ${message}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "送信失敗" };
  }
}
