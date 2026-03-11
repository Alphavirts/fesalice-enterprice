import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Try Supabase Auth first
        const { data: authData, error: authError } = await (await import("@/lib/supabase")).supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (!authError && authData.user) {
          // Get profile data
          const { data: profile } = await (await import("@/lib/supabase")).supabase
            .from("profiles")
            .select("*")
            .eq("id", authData.user.id)
            .single();

          return {
            id: authData.user.id,
            email: authData.user.email!,
            name: profile?.full_name || authData.user.email?.split("@")[0],
            role: profile?.role || "user",
            tenantId: "default", // Supabase doesn't use the Prisma tenantId by default
          };
        }

        // Fallback to local Prisma (for development/legacy)
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (user && user.password) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              return {
                id: user.id,
                email: user.email,
                name: user.fullName,
                role: user.role,
                tenantId: user.tenantId,
              };
            }
          }
        } catch (e) {
          console.error("Prisma lookup failed:", e);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.tenantId = user.tenantId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};
