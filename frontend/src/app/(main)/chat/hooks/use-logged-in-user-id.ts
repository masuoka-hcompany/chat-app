"use client";
import { useSession } from "next-auth/react";
export function useLoggedInUserId() {
  const { data: session } = useSession();
  return session?.user?.id ?? null;
}
