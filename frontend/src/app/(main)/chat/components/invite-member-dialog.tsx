"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { InviteMemberAction } from "../actions/invite-member-action";
import { toast } from "sonner";

export type InviteMemberDialogProps = {
  roomId: string;
  users: Array<{
    id: string;
    name: string;
    profileImageUrl: string;
  }>;
};

export function InviteMemberDialog({ roomId, users }: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus size={18} />
          招待
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full">
        <DialogTitle className="text-2xl font-bold">
          メンバーを招待する
        </DialogTitle>
        <div>
          {users.length === 0 ? (
            <div className="text-gray-400">招待可能なユーザーはありません</div>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-2 rounded flex items-center gap-2 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={user.profileImageUrl}
                      alt={user.name + "のプロフィール画像"}
                      className="w-8 h-8 rounded-full object-cover bg-gray-200"
                    />
                    {user.name}
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      startTransition(async () => {
                        const result = await InviteMemberAction(
                          roomId,
                          user.id,
                        );
                        if (result.ok) {
                          toast("ルームに招待しました。", {
                            description: `ユーザー ${user.name} をルームに招待しました。`,
                          });
                          setOpen(false);
                          router.refresh();
                        } else {
                          toast(
                            `ルームへの招待に失敗しました: ${result.error}`,
                          );
                        }
                      });
                    }}
                    disabled={pending}
                  >
                    招待する
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
