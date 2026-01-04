import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

async function generateStandardJWT(token: any) {
  return new SignJWT(token)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  session: { strategy: "jwt" },
  jwt: {
    async encode({ token }) {
      return await generateStandardJWT(token);
    },
    async decode({ token }) {
      if (!token) return null;
      try {
        const { payload } = await jwtVerify(token, secret, {
          algorithms: ["HS256"],
        });
        return payload as any;
      } catch {
        return null;
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user.email) return false;

      const response = await fetch(`${process.env.BACKEND_URL}/auth/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AUTH_SYNC_SECRET}`,
        },
        body: JSON.stringify({
          email: user.email,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      user.id = data.user.id;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
        session.accessToken = await generateStandardJWT(token);
      }
      return session;
    },
  },
});
