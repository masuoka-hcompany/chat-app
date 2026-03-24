"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { CreateRoomDialog } from "./create-room-dialog";
import Link from "next/link";

export type JoinedRoomListProps = {
  rooms: {
    id: string;
    name: string;
    isActive: boolean;
  }[];
};

export function JoinedRoomList({ rooms }: JoinedRoomListProps) {
  return (
    <Collapsible title="ルーム" defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm flex items-center justify-between"
        >
          <div className="flex items-center w-full">
            <CollapsibleTrigger className="flex items-center flex-1">
              ルーム
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CreateRoomDialog />
          </div>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {rooms.map((room) => (
                <SidebarMenuItem key={room.id}>
                  <SidebarMenuButton asChild isActive={room.isActive}>
                    <Link href={`/chat/${room.id}`}># {room.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
