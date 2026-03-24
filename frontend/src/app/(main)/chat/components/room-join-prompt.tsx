"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { joinRoomAction } from "../actions/join-room-action";
import { useRouter } from "next/navigation";

export type RoomJoinPromptProps = {
  roomId: string;
  roomName: string;
};

export function RoomJoinPrompt({ roomId, roomName }: RoomJoinPromptProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div id="chat-input-area" className="flex justify-center items-center py-8">
      <Card className="w-full max-w-3xl mx-auto flex flex-col items-center bg-gray-50 p-8">
        <div className="text-2xl font-bold mb-6"># {roomName}</div>
        <Button
          className="text-lg font-bold px-8 py-4"
          onClick={() => {
            startTransition(async () => {
              const result = await joinRoomAction(roomId);
              if (result.ok) {
                toast("チャンネルに参加しました");
                router.refresh();
              } else {
                toast(`参加に失敗しました: ${result.error}`);
              }
            });
          }}
          disabled={pending}
        >
          {pending ? "参加中..." : "チャンネルに参加する"}
        </Button>
      </Card>
    </div>
  );
}
