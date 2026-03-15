import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default async function ChatRoomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return (
    <>
      <AppSidebar roomId={roomId} />
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}
