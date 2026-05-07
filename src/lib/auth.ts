import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

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
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) return null;
        const { email, password } = result.data;

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // No user found
        if (!user) return null;

        //User exists but registered with Google — no password
        if (!user.password) return null;

        //Compare submitted password with stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        //Wrong password
        if (!passwordMatch) return null;

        //Success — return user object
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
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
