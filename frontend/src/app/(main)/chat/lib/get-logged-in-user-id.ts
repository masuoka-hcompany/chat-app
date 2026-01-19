"use server";

import { auth } from "@/auth";

export async function getLoggedInUserId() {
  const session = await auth();
  return session?.user?.id ?? null;
}
