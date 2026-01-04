import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * session オブジェクトの型を拡張
   */
  interface Session {
    accessToken?: string; // 追加したプロパティ
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * jwt コールバックで渡ってくる token オブジェクトの型を拡張
   */
  interface JWT {
    accessToken?: string;
  }
}
