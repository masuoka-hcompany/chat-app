import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { UrqlClientProvider } from "@/components/provider/urql-client-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "chat-app",
  description:
    "Next.jsとGraphQLを用いたWebアプリ開発学習を目的としたチャットアプリ",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-visible`}
      >
        <UrqlClientProvider>
          <SessionProvider session={session}>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </SessionProvider>
        </UrqlClientProvider>
      </body>
    </html>
  );
}
