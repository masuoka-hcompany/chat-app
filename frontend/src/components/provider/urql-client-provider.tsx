"use client";

import { urqlClient } from "@/lib/urql/client";
import React from "react";
import { Provider } from "urql";

export function UrqlClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider value={urqlClient}>{children}</Provider>;
}
