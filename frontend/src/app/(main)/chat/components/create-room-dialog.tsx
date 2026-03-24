"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { createRoomAction } from "../actions/create-room-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateRoomDialog() {
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full">
        <DialogTitle className="text-2xl font-bold mb-6">
          チャンネルを作成する
        </DialogTitle>
        <div className="mb-2 font-semibold">名前</div>
        <Input
          className="text-lg px-4 py-3 rounded-xl border-2 border-gray-200 mb-6"
          placeholder="# 例: general"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button
            className="px-8 py-2 text-base font-semibold rounded-lg"
            disabled={!roomName.trim() || pending}
            onClick={() => {
              startTransition(async () => {
                const result = await createRoomAction(roomName);
                if (result.ok) {
                  toast("ルームを作成しました。", { description: roomName });
                  setOpen(false);
                  router.refresh();
                } else {
                  toast(`ルームの作成に失敗しました: ${result.error}`);
                }
              });
            }}
          >
            {pending ? "作成中..." : "次へ"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
