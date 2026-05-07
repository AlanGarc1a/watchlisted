import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
  trustHost: true,

  // ✅ Use JWT instead of database sessions
  session: {
    strategy: "jwt",
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //these are custom pages to redirect to instead
  //of nextauth default page
  pages: {
    signIn: "/login",
  },
  //callbacks to run at specific points in the flow
  callbacks: {
    // JWT callback — runs when token is created or updated
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Session callback — runs when session is accessed
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
