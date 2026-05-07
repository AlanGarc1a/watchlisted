import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // connects NextAuth to your database
  adapter: PrismaAdapter(prisma as any),
  trustHost: true,

  //these are the login methods that are supported
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
    // this runs every time a session is accessed
    //add user id to the session
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
