import { env } from "@/env.mjs";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // role: UserRole;
    username: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+guilds",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.username = (profile as any).username;
        token.name = (profile as any).global_name;
        token.access_token = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        username: token.username,
      },
    }),
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
