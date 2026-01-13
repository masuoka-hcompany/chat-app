"use client";

import { createUrqlClient } from "@/lib/urql/client";
import React, { useMemo } from "react";
import { Provider } from "urql";
import { useSession } from "next-auth/react";

export function UrqlClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const client = useMemo(
    () => createUrqlClient(session?.accessToken),
    [session?.accessToken]
  );

  return <Provider value={client}>{children}</Provider>;
}
