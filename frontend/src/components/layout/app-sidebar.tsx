import * as React from "react";
import { Box, LogOut } from "lucide-react";
import { signOut } from "@/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarRoomListContainer } from "@/app/(main)/chat/components/sidebar-room-list-container";

export function AppSidebar({
  roomId,
  ...props
}: { roomId?: string } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <span className="flex items-center gap-1.5">
          <Box size={20} strokeWidth={2} className="mt-1" />
          <span className="text-base font-semibold">chat-app</span>
        </span>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarRoomListContainer roomId={roomId} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <SidebarMenuButton type="submit">
                <LogOut />
                <span>ログアウト</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
