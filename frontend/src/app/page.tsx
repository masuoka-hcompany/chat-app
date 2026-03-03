import { redirect } from "next/navigation";
import { getFirstJoinedRoomId } from "@/lib/room";

export default async function Page() {
  const firstRoomId = await getFirstJoinedRoomId();
  if (firstRoomId) {
    redirect(`/chat/${firstRoomId}`);
  } else {
    const { notFound } = await import("next/navigation");
    notFound();
  }
}
